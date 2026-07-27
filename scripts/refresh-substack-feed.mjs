#!/usr/bin/env node
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SUBSTACK_USERNAME = "bitacoradeuningenierodesoftware";
const FEED_URL = `https://${SUBSTACK_USERNAME}.substack.com/feed`;
const API_URL = `https://${SUBSTACK_USERNAME}.substack.com/api/v1/posts?limit=3`;
const JINA_PROXY_URL = `https://r.jina.ai/${API_URL}`;
// rss2json: proxy server-side de lectura RSS→JSON. Substack ve la IP de rss2json
// (no la del runner de GitHub Actions), por lo que sortea el bloqueo 403 por
// reputación de IP de datacenter. Keyless funciona de sobra para 1 refresh/día.
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;
const OUTPUT_PATH = resolve(ROOT, "assets/data/substack-feed.json");
const MAX_POSTS = 3;
const REQUEST_TIMEOUT_MS = 15_000;
// Nivel 1: reintentos ante fallos transitorios. MAX_ATTEMPTS incluye el intento
// inicial (1) + reintentos. RETRY_BACKOFF_MS[i] es la espera antes del reintento i+1.
const MAX_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = [2_000, 5_000];
// Solo reintentamos ante estos status (transitorios) o timeout. Un 403/404 es un
// bloqueo estable → no reintentar, saltar de capa de inmediato.
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
// Nivel 2: si todas las capas fallan pero el snapshot en disco es más reciente que
// esto, el run NO se marca como fallido (evita emails por baches transitorios de
// proxy). Solo falla (exit 1) si el snapshot no existe o ya es obsoleto.
const STALE_SNAPSHOT_MAX_DAYS = 7;
const BROWSER_UA =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function decodeHtmlEntities(str) {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, " ")
        .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function extractCData(raw) {
    if (!raw) return "";
    const cdataMatch = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
    // Substack codifica entidades HTML (&#243; etc.) también dentro de CDATA;
    // decodificar aquí garantiza texto limpio sea cual sea la capa que gane.
    if (cdataMatch) return decodeHtmlEntities(cdataMatch[1].trim());
    return decodeHtmlEntities(raw.trim());
}

function extractField(itemXml, tag) {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
    const match = itemXml.match(re);
    return match ? extractCData(match[1]) : "";
}

function parseRssItems(xml) {
    const items = [];
    const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemRegex.exec(xml)) !== null) {
        const itemXml = match[1];
        const title = extractField(itemXml, "title");
        const link = extractField(itemXml, "link");
        const pubDate = toIsoDate(extractField(itemXml, "pubDate"));
        const description = extractField(itemXml, "description");
        if (title && link) items.push({ title, link, pubDate, description });
    }
    return items;
}

function mapApiPosts(json) {
    if (!Array.isArray(json)) return [];
    return json
        .filter((p) => p && p.title && p.canonical_url)
        .map((p) => ({
            title: p.title,
            link: p.canonical_url,
            pubDate: toIsoDate(p.post_date),
            description: p.description || p.subtitle || "",
        }));
}

// Normaliza fechas heterogéneas (RFC822, ISO, "YYYY-MM-DD HH:MM:SS") a ISO 8601.
// Si no se puede parsear, devuelve el valor original (main.js tolera ambos).
function toIsoDate(value) {
    if (!value) return "";
    const normalized = value.includes(" ") && !value.includes("T") ? `${value.replace(" ", "T")}Z` : value;
    const date = new Date(normalized);
    return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function mapRss2Json(json) {
    if (!json || json.status !== "ok" || !Array.isArray(json.items)) return [];
    return json.items
        .filter((p) => p && p.title && p.link)
        .map((p) => ({
            title: p.title,
            link: p.link,
            pubDate: toIsoDate(p.pubDate),
            description: p.description || "",
        }));
}

async function fetchWithTimeout(url, { timeoutMs = REQUEST_TIMEOUT_MS, accept, extraHeaders } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": BROWSER_UA,
                "Accept-Language": "en-US,en;q=0.9",
                Accept: accept || "*/*",
                ...(extraHeaders || {}),
            },
        });
        if (!response.ok) {
            const err = new Error(`HTTP ${response.status} ${response.statusText}`);
            err.status = response.status;
            throw err;
        }
        return await response.text();
    } finally {
        clearTimeout(timer);
    }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Un fallo es reintentable si es un timeout (AbortError) o un status transitorio.
// Ante un status estable (403/404) o un error de red sin status, no reintentamos.
function isRetryable(err) {
    if (err?.name === "AbortError") return true;
    if (typeof err?.status === "number") return RETRYABLE_STATUS.has(err.status);
    return false;
}

// Nivel 1: envuelve fetchWithTimeout con reintentos + backoff para fallos transitorios.
async function fetchWithRetry(url, opts = {}, label = "request") {
    let lastError;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            return await fetchWithTimeout(url, opts);
        } catch (err) {
            lastError = err;
            if (attempt < MAX_ATTEMPTS && isRetryable(err)) {
                const waitMs = RETRY_BACKOFF_MS[attempt - 1];
                console.warn(
                    `retry ${attempt}/${MAX_ATTEMPTS - 1} for ${label} after ${waitMs}ms (${err.message})`,
                );
                await delay(waitMs);
                continue;
            }
            throw err;
        }
    }
    throw lastError;
}

async function tryRss() {
    console.log(`[1/4] Trying RSS: ${FEED_URL}`);
    const xml = await fetchWithRetry(
        FEED_URL,
        { accept: "application/rss+xml, application/xml, text/xml, */*" },
        "RSS",
    );
    const items = parseRssItems(xml);
    if (items.length === 0) throw new Error("RSS parsed 0 items");
    console.log(`[1/4] RSS OK: ${items.length} items`);
    return { source: FEED_URL, items };
}

async function tryApi() {
    console.log(`[2/4] Trying API direct: ${API_URL}`);
    const text = await fetchWithRetry(API_URL, { accept: "application/json" }, "API direct");
    const json = JSON.parse(text);
    const items = mapApiPosts(json);
    if (items.length === 0) throw new Error("API returned 0 items");
    console.log(`[2/4] API OK: ${items.length} items`);
    return { source: API_URL, items };
}

async function tryRss2Json() {
    console.log(`[3/4] Trying rss2json: ${RSS2JSON_URL}`);
    const text = await fetchWithRetry(RSS2JSON_URL, { accept: "application/json" }, "rss2json");
    const json = JSON.parse(text);
    const items = mapRss2Json(json);
    if (items.length === 0) throw new Error(`rss2json returned 0 items (status: ${json?.status})`);
    console.log(`[3/4] rss2json OK: ${items.length} items`);
    return { source: RSS2JSON_URL, items };
}

async function tryJinaProxy() {
    console.log(`[4/4] Trying Jina proxy: ${JINA_PROXY_URL}`);
    // JINA_API_KEY (opcional, GitHub Secret) sube el rate limit y evita el 403
    // que Jina devuelve a peticiones anónimas desde IPs compartidas de CI.
    const extraHeaders = { "X-Return-Format": "text" };
    if (process.env.JINA_API_KEY) {
        extraHeaders.Authorization = `Bearer ${process.env.JINA_API_KEY}`;
    }
    const text = await fetchWithRetry(
        JINA_PROXY_URL,
        { accept: "application/json", extraHeaders },
        "Jina proxy",
    );
    // Jina wraps the upstream response: { code, status, data: { text: "<stringified-substack-json>" } }
    // We must unwrap .data.text and re-parse it to get the original Substack array.
    const wrapper = JSON.parse(text);
    const inner = wrapper?.data?.text;
    if (typeof inner !== "string") {
        throw new Error("Jina proxy: missing data.text in wrapper");
    }
    const json = JSON.parse(inner);
    const items = mapApiPosts(json);
    if (items.length === 0) throw new Error("Jina proxy returned 0 items");
    console.log(`[4/4] Jina OK: ${items.length} items`);
    return { source: JINA_PROXY_URL, items };
}

// Nivel 2: cuando TODAS las capas fallan, no sobreescribimos nada. Si el snapshot
// en disco sigue fresco (< STALE_SNAPSHOT_MAX_DAYS), salimos 0 con un ::warning::
// para no marcar el run como fallido por un bache transitorio de proxy. Solo salimos
// con exit 1 (run rojo + email) si el snapshot no existe/es inválido o ya es obsoleto.
async function handleAllStrategiesFailed(lastError) {
    const reason = `All strategies failed. Last error: ${lastError?.message}`;

    let snapshot = null;
    try {
        snapshot = JSON.parse(await readFile(OUTPUT_PATH, "utf8"));
    } catch {
        snapshot = null;
    }

    const updatedAtMs = snapshot?.updated_at ? Date.parse(snapshot.updated_at) : Number.NaN;
    const hasValidSnapshot =
        snapshot &&
        Number.isInteger(snapshot.count) &&
        snapshot.count > 0 &&
        !Number.isNaN(updatedAtMs);

    if (hasValidSnapshot) {
        const ageDays = (Date.now() - updatedAtMs) / 86_400_000;
        if (ageDays < STALE_SNAPSHOT_MAX_DAYS) {
            // ::warning:: se emite por stdout para que GitHub Actions lo capture como aviso.
            console.log(
                `::warning::${reason} Snapshot vigente (${ageDays.toFixed(1)}d < ${STALE_SNAPSHOT_MAX_DAYS}d); se conserva y el run no falla.`,
            );
            return;
        }
        console.error(
            `${reason} Snapshot obsoleto (${ageDays.toFixed(1)}d >= ${STALE_SNAPSHOT_MAX_DAYS}d).`,
        );
    } else {
        console.error(`${reason} No hay snapshot válido en disco sobre el que degradar.`);
    }
    process.exit(1);
}

async function main() {
    // Orden por fiabilidad desde CI: primero las rutas directas gratuitas (funcionan
    // cuando la IP del runner está limpia); luego proxies server-side que sortean el
    // bloqueo 403 por reputación de IP de datacenter (Substack ve la IP del proxy).
    const strategies = [
        { name: "RSS", fn: tryRss },
        { name: "API direct", fn: tryApi },
        { name: "rss2json", fn: tryRss2Json },
        { name: "Jina proxy", fn: tryJinaProxy },
    ];

    let result;
    let lastError;
    for (const { name, fn } of strategies) {
        try {
            result = await fn();
            break;
        } catch (err) {
            lastError = err;
            console.warn(`${name} failed: ${err.message}`);
        }
    }

    if (!result) {
        await handleAllStrategiesFailed(lastError);
        return;
    }

    const posts = result.items.slice(0, MAX_POSTS);
    const payload = {
        source: result.source,
        updated_at: new Date().toISOString(),
        count: posts.length,
        posts,
    };

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`Wrote ${OUTPUT_PATH} (${posts.length} posts from ${result.source})`);
}

main().catch((err) => {
    console.error("Failed to refresh Substack feed:", err);
    process.exit(1);
});
