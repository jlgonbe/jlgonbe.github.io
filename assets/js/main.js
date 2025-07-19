// Configuración para GitHub Pages
const substackUsername = "bitacoradeuningenierodesoftware";
const instagramUsername = "jlgonbe";

// Función para cargar las publicaciones de Substack
async function loadSubstackPosts() {
    const container = document.getElementById("substack-posts");
    
    if (!container) {
        console.warn("Container 'substack-posts' not found");
        return;
    }

    try {
        // Usar proxy CORS compatible con GitHub Pages
        const feedUrl = `https://${substackUsername}.substack.com/feed`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
        
        // Mostrar estado de carga
        container.innerHTML = "<div class='substack-loading'>Cargando publicaciones...</div>";
        
        const response = await axios.get(proxyUrl, {
            timeout: 10000, // 10 segundos de timeout
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Verificar que la respuesta sea válida
        if (!response.data || !response.data.contents) {
            throw new Error("Respuesta inválida del proxy");
        }
        
        const parser = new DOMParser();
        const xml = parser.parseFromString(response.data.contents, "text/xml");
        
        // Verificar errores de parsing XML
        const parserError = xml.querySelector("parsererror");
        if (parserError) {
            throw new Error("Error parsing RSS feed");
        }
        
        const items = xml.querySelectorAll("item");
        
        if (items.length === 0) {
            container.innerHTML = "<div class='substack-empty'>No hay publicaciones disponibles.</div>";
            return;
        }
        
        // Limpiar container y agregar posts
        container.innerHTML = "";
        container.className = "substack-posts-container";
        
        items.forEach((item, index) => {
            if (index < 3) { // Mostrar solo los 3 más recientes
                const title = item.querySelector("title")?.textContent?.trim();
                const link = item.querySelector("link")?.textContent?.trim();
                const pubDate = item.querySelector("pubDate")?.textContent?.trim();
                
                if (title && link) {
                    const postElement = document.createElement("a");
                    postElement.href = link;
                    postElement.target = "_blank";
                    postElement.rel = "noopener";
                    postElement.className = "substack-post";
                    
                    let dateFormatted = "";
                    if (pubDate) {
                        const date = new Date(pubDate);
                        dateFormatted = date.toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        });
                    }
                    
                    postElement.innerHTML = `
                        <div class="substack-post-title">${title}</div>
                        ${dateFormatted ? `<div class="substack-post-date">${dateFormatted}</div>` : ''}
                    `;
                    
                    container.appendChild(postElement);
                }
            }
        });
        
    } catch (error) {
        console.error("Error loading Substack feed:", error);
        container.innerHTML = `
            <div class="substack-error">
                <div class="substack-error-text">
                    No se pudo cargar el feed de Substack
                </div>
                <a href="https://${substackUsername}.substack.com" target="_blank" rel="noopener" class="substack-error-link">
                    Visitar directamente ->
                </a>
            </div>
        `;
    }
}

// Cargar las publicaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadSubstackPosts();
});
