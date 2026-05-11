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

function hidePostsListShowOnlyLink(container) {
    container.innerHTML = "";
    container.style.display = "none";
    const block = container.closest(".latest-posts-block");
    if (block) {
        const title = block.querySelector(".latest-posts-title");
        if (title) title.style.display = "none";
    }
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
            hidePostsListShowOnlyLink(container);
            return;
        }

        container.innerHTML = "";
        container.className = "substack-posts-container";
        posts.forEach((post) => renderPost(container, post));
    } catch (error) {
        console.error("Error loading Substack feed:", error);
        hidePostsListShowOnlyLink(container);
    }
}

document.addEventListener("DOMContentLoaded", loadSubstackPosts);
