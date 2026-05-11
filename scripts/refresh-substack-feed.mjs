#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SUBSTACK_USERNAME = "bitacoradeuningenierodesoftware";
const FEED_URL = `https://${SUBSTACK_USERNAME}.substack.com/feed`;
const API_URL = `https://${SUBSTACK_USERNAME}.substack.com/api/v1/posts?limit=3`;
const OUTPUT_PATH = resolve(ROOT, "assets/data/substack-feed.json");
const MAX_POSTS = 3;
const REQUEST_TIMEOUT_MS = 15_000;
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
    if (cdataMatch) return cdataMatch[1].trim();
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
        const pubDate = extractField(itemXml, "pubDate");
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
            pubDate: p.post_date || "",
            description: p.description || p.subtitle || "",
        }));
}

async function fetchWithTimeout(url, { timeoutMs = REQUEST_TIMEOUT_MS, accept } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": BROWSER_UA,
                "Accept-Language": "en-US,en;q=0.9",
                Accept: accept || "*/*",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
        return await response.text();
    } finally {
        clearTimeout(timer);
    }
}

async function tryRss() {
    console.log(`[1/2] Trying RSS: ${FEED_URL}`);
    const xml = await fetchWithTimeout(FEED_URL, {
        accept: "application/rss+xml, application/xml, text/xml, */*",
    });
    const items = parseRssItems(xml);
    if (items.length === 0) throw new Error("RSS parsed 0 items");
    console.log(`[1/2] RSS OK: ${items.length} items`);
    return { source: FEED_URL, items };
}

async function tryApi() {
    console.log(`[2/2] Falling back to API: ${API_URL}`);
    const text = await fetchWithTimeout(API_URL, { accept: "application/json" });
    const json = JSON.parse(text);
    const items = mapApiPosts(json);
    if (items.length === 0) throw new Error("API returned 0 items");
    console.log(`[2/2] API OK: ${items.length} items`);
    return { source: API_URL, items };
}

async function main() {
    let result;
    try {
        result = await tryRss();
    } catch (rssErr) {
        console.warn(`[1/2] RSS failed: ${rssErr.message}`);
        result = await tryApi();
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
