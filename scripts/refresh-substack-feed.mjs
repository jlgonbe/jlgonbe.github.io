#!/usr/bin/env node
// Fetches the Substack RSS feed at build-time and writes a static JSON
// snapshot to assets/data/substack-feed.json.
//
// Why: depending on a public CORS proxy at runtime (api.allorigins.win) was
// unreliable. This script runs in GitHub Actions on a schedule and commits
// the JSON, so the browser only ever reads a same-origin static file.
//
// Requires Node >= 20 (built-in fetch).

import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SUBSTACK_USERNAME = "bitacoradeuningenierodesoftware";
const FEED_URL = `https://${SUBSTACK_USERNAME}.substack.com/feed`;
const OUTPUT_PATH = resolve(ROOT, "assets/data/substack-feed.json");
const MAX_POSTS = 3;
const REQUEST_TIMEOUT_MS = 15_000;

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
        if (title && link) {
            items.push({ title, link, pubDate, description });
        }
    }
    return items;
}

async function fetchWithTimeout(url, timeoutMs = REQUEST_TIMEOUT_MS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                "User-Agent": "jlgonbe.github.io feed refresher (+https://jlgonbe.github.io)",
                Accept: "application/rss+xml, application/xml, text/xml, */*",
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

async function main() {
    console.log(`Fetching feed: ${FEED_URL}`);
    const xml = await fetchWithTimeout(FEED_URL);
    console.log(`Received ${xml.length} bytes`);

    const allItems = parseRssItems(xml);
    if (allItems.length === 0) {
        throw new Error("No items parsed from feed");
    }
    const posts = allItems.slice(0, MAX_POSTS);
    console.log(`Parsed ${allItems.length} items, keeping ${posts.length}`);

    const payload = {
        source: FEED_URL,
        updated_at: new Date().toISOString(),
        count: posts.length,
        posts,
    };

    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + "\n", "utf8");
    console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
    console.error("Failed to refresh Substack feed:", err);
    process.exit(1);
});
