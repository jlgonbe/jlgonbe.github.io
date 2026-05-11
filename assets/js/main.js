const SUBSTACK_USERNAME = "bitacoradeuningenierodesoftware";
const FEED_JSON_URL = "assets/data/substack-feed.json";
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

function renderPost(container, post) {
    const { title, link, pubDate } = post;
    if (!title || !link) return;

    const article = document.createElement("a");
    article.href = link;
    article.target = "_blank";
    article.rel = "noopener noreferrer";
    article.className = "substack-post";

    const titleEl = document.createElement("div");
    titleEl.className = "substack-post-title";
    titleEl.textContent = title;
    article.appendChild(titleEl);

    const dateText = formatDate(pubDate);
    if (dateText) {
        const dateEl = document.createElement("div");
        dateEl.className = "substack-post-date";
        dateEl.textContent = dateText;
        article.appendChild(dateEl);
    }

    container.appendChild(article);
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
        const response = await fetchWithTimeout(FEED_JSON_URL, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const payload = await response.json();
        const posts = Array.isArray(payload?.posts) ? payload.posts.slice(0, MAX_POSTS) : [];
        if (posts.length === 0) {
            container.innerHTML = "<div class='substack-empty'>No hay publicaciones disponibles.</div>";
            return;
        }

        container.innerHTML = "";
        container.className = "substack-posts-container";
        posts.forEach((post) => renderPost(container, post));
    } catch (error) {
        console.error("Error loading Substack feed:", error);
        renderError(container);
    }
}

document.addEventListener("DOMContentLoaded", loadSubstackPosts);
