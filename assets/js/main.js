const SUBSTACK_USERNAME = "bitacoradeuningenierodesoftware";
const FEED_URL = `https://${SUBSTACK_USERNAME}.substack.com/feed`;
const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(FEED_URL)}`;
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_POSTS = 3;

async function fetchWithTimeout(url, { timeout = REQUEST_TIMEOUT_MS, ...options } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

function formatDate(pubDate) {
    if (!pubDate) return "";
    const date = new Date(pubDate);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" });
}

function renderPost(container, item) {
    const title = item.querySelector("title")?.textContent?.trim();
    const link = item.querySelector("link")?.textContent?.trim();
    if (!title || !link) return;

    const post = document.createElement("a");
    post.href = link;
    post.target = "_blank";
    post.rel = "noopener noreferrer";
    post.className = "substack-post";

    const titleEl = document.createElement("div");
    titleEl.className = "substack-post-title";
    titleEl.textContent = title;
    post.appendChild(titleEl);

    const dateText = formatDate(item.querySelector("pubDate")?.textContent?.trim());
    if (dateText) {
        const dateEl = document.createElement("div");
        dateEl.className = "substack-post-date";
        dateEl.textContent = dateText;
        post.appendChild(dateEl);
    }

    container.appendChild(post);
}

function renderError(container) {
    container.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "substack-error";

    const text = document.createElement("div");
    text.className = "substack-error-text";
    text.textContent = "No se pudo cargar el feed de Substack.";
    wrap.appendChild(text);

    const link = document.createElement("a");
    link.href = `https://${SUBSTACK_USERNAME}.substack.com`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "substack-error-link";
    link.textContent = "Visitar directamente →";
    wrap.appendChild(link);

    container.appendChild(wrap);
}

async function loadSubstackPosts() {
    const container = document.getElementById("substack-posts");
    if (!container) return;

    container.innerHTML = "<div class='substack-loading'>Cargando publicaciones...</div>";

    try {
        const response = await fetchWithTimeout(PROXY_URL, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const payload = await response.json();
        if (!payload?.contents) throw new Error("Respuesta inválida del proxy");

        const xml = new DOMParser().parseFromString(payload.contents, "text/xml");
        if (xml.querySelector("parsererror")) throw new Error("Error parseando RSS");

        const items = Array.from(xml.querySelectorAll("item")).slice(0, MAX_POSTS);
        if (items.length === 0) {
            container.innerHTML = "<div class='substack-empty'>No hay publicaciones disponibles.</div>";
            return;
        }

        container.innerHTML = "";
        container.className = "substack-posts-container";
        items.forEach((item) => renderPost(container, item));
    } catch (error) {
        console.error("Error loading Substack feed:", error);
        renderError(container);
    }
}

document.addEventListener("DOMContentLoaded", loadSubstackPosts);
