# 👨‍💻 José Luis González Beltrán — Sitio Web Personal

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success)](https://jlgonbe.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> 🌐 **[Ver sitio web](https://jlgonbe.github.io)**

Sitio web personal de **José Luis González Beltrán** — Ingeniero de software, triatleta y aprendiz constante. Una landing alineada con la marca personal 2026, donde la **Bitácora de un Ingeniero de Software** (newsletter en Substack) es el activo central.

## 🎯 Descripción

Sitio estático construido con **HTML5, CSS3 y JavaScript vanilla**. Sin frameworks, sin build step, sin dependencias externas (excepto Google Fonts). Optimizado para captar suscriptores a la newsletter, transmitir identidad personal y ser técnicamente sólido (SEO, OG/Twitter Cards, performance, responsive).

### ✨ Características

- **🎨 CSS personalizado** — Sin frameworks, paleta sobria (`#E5E7EB` / `#1C1C1C` / `#1F3B4D` / `#9AC8E2`) + paleta editorial Bitácora (`#f4f1e1` / `#1a1a1a` / `#3e8e41`)
- **📱 Responsive** — Mobile-first, validado en 320 / 375 / 768 / 1280 px
- **📰 Bloque Bitácora destacado** — Manifiesto enfocado a IA + 4 pain points "¿Te suena?" con iconos SVG + iframe Substack + últimas entradas
- **🤖 Feed Substack vía GitHub Action** — JSON estático refrescado cada 6h, sin proxies CORS de terceros
- **🔍 SEO + OG + Twitter Cards** — Meta tags completos, OG image 1200×630, canonical, manifest, favicons multi-tamaño
- **🖼️ Imágenes optimizadas** — `<picture>` con WebP + JPEG fallback (~3.5 MB ahorrados respecto a la versión anterior)
- **🔐 JS XSS-safe** — Fetch nativo (sin `axios`), `textContent` para inyectar contenido dinámico, `AbortController` para timeouts

## 🏗️ Estructura del Proyecto

```text
jlgonbe.github.io/
├── index.html                       # Página principal (1 sola página)
├── site.webmanifest                 # PWA manifest
├── params.json                      # Configuración GitHub Pages
├── .github/workflows/
│   └── refresh-substack-feed.yml    # Action: refresca feed cada 6h + dispatch manual
├── scripts/
│   └── refresh-substack-feed.mjs    # Node 20+ fetch RSS → JSON estático
├── assets/
│   ├── css/
│   │   └── style.css                # Estilos (vanilla, ~600 líneas)
│   ├── js/
│   │   └── main.js                  # Fetch JSON local + render últimas entradas
│   ├── data/
│   │   └── substack-feed.json       # Snapshot generado por la Action
│   ├── images/
│   │   ├── profile.{webp,jpg,svg}   # Avatar (WebP + JPEG fallback)
│   │   ├── og-image.{jpg,svg}       # Open Graph 1200×630
│   │   └── originals/               # Backups pre-optimización
│   ├── icons/
│   │   ├── github-logo.png
│   │   ├── instagram-logo.png
│   │   ├── linkedin-logo.png
│   │   ├── substack-logo.png
│   │   ├── x-logo.png
│   │   └── originals/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── favicon-{16,32,192,512}.png
│   └── apple-touch-icon.png
├── .sisyphus/plans/                 # Plans de realineamiento de marca
└── README.md
```

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| **HTML5 semántico** | Estructura, accesibilidad, SEO |
| **CSS3** | Estilos, grid, responsive (sin frameworks) |
| **JavaScript ES6+ vanilla** | `fetch` nativo + `AbortController` para cargar el JSON local del feed |
| **Google Fonts** | IBM Plex Serif + Inter + IBM Plex Mono (marca personal) y Lora + Inter (bloque editorial Bitácora) |
| **GitHub Actions + Node 20** | Workflow programado (cron `0 */6 * * *` + dispatch) que refresca `assets/data/substack-feed.json` desde el RSS de Substack |
| **iframe Substack** | Form de suscripción embebido (transparente, lazy-loaded) |

## 📐 Arquitectura de la página

1. **Hero** — Identidad triple ("Ingeniero. Triatleta. Aprendiz constante.") + tagline + puente a la Bitácora.
2. **Bloque Bitácora destacado** (sección principal):
   - Manifiesto enfocado a IA: "La IA no te hace mejor ingeniero. Amplifica al que ya lo es."
   - 4 tarjetas "¿Te suena?" con pain points e iconos SVG inline (lupa, chip, cerebro, engranaje) — sin nombres ficticios.
   - CTA + iframe de suscripción a Substack.
   - Últimas 3 entradas cargadas desde JSON estático (`assets/data/substack-feed.json`).
3. **Banda CTA oscura** — "La IA no arregla el pensamiento mediocre. Lo amplifica." + 2º iframe + link al dominio custom.
4. **Otros frentes** — 2 cards: Triatlón en Instagram + El laboratorio (GitHub).
5. **Conecta conmigo** — Iconos sociales (X, LinkedIn, Substack, GitHub).
6. **Footer** — Manifiesto personal + copyright.

## ⚙️ Funcionalidades dinámicas

### 📡 Feed de Substack (sin proxies de terceros)

- **Fuente**: RSS de [bitacoradeuningenierodesoftware.substack.com/feed](https://bitacoradeuningenierodesoftware.substack.com/feed).
- **Refresco**: GitHub Action `refresh-substack-feed.yml` ejecuta `scripts/refresh-substack-feed.mjs` cada 6h (cron `0 */6 * * *`) y bajo demanda (`workflow_dispatch`).
- **Salida**: `assets/data/substack-feed.json` con las 3 últimas entradas (`title`, `link`, `pubDate`, `description`).
- **Commit del bot**: el workflow commitea con `[skip ci]` para evitar loops; usa `concurrency` para serializar runs.
- **Frontend**: `main.js` hace `fetch('assets/data/substack-feed.json')` con `AbortController` (timeout 10s) y renderiza con `textContent` (XSS-safe).
- **Fallback**: si el JSON falla a cargar, se muestra un enlace directo a Substack.
- **Permisos requeridos** en el repo: Settings → Actions → Workflow permissions = "Read and write".

### 📧 Suscripción a la newsletter

- 2 puntos de captura: iframe en el bloque Bitácora + iframe en la banda CTA oscura final.
- Iframe embebido oficial de Substack (`?transparent=1`).
- `loading="lazy"` para no penalizar el First Contentful Paint.
- Responsive: ancho 100% en mobile.

## 🚀 Desarrollo Local

```bash
git clone https://github.com/jlgonbe/jlgonbe.github.io.git
cd jlgonbe.github.io

python3 -m http.server 8000      # http://localhost:8000
npx serve .                      # http://localhost:3000
open index.html                  # Abrir directo en el navegador
```

### Refrescar el feed manualmente

```bash
node scripts/refresh-substack-feed.mjs
# Genera/actualiza assets/data/substack-feed.json con las 3 últimas entradas.
```

> Requiere Node 20+ (usa `fetch` nativo, sin dependencias npm).

## 🌐 Despliegue

Despliegue automático en **GitHub Pages** desde la rama `master`:

- **URL**: <https://jlgonbe.github.io>
- **HTTPS**: Habilitado por defecto
- **Cada push a `master`** → re-deploy automático

## 🧪 Validación

- Smoke test HTTP local (todos los assets devuelven 200).
- Render headless con Chrome a 320 / 375 / 1280 px para validar responsive.
- Validadores OG sugeridos tras deploy: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), [Twitter Card Validator](https://cards-dev.twitter.com/validator), [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).

## 👤 Autor

**José Luis González Beltrán**

- 🌐 Web: [jlgonbe.github.io](https://jlgonbe.github.io)
- 📝 Bitácora: [Bitácora de un Ingeniero de Software](https://bitacoradeuningenierodesoftware.substack.com)
- 💼 LinkedIn: [@jlgonbe](https://linkedin.com/in/jlgonbe)
- 🐦 X: [@jlgonbe](https://x.com/jlgonbe)
- 📸 Instagram: [@jlgonbe](https://instagram.com/jlgonbe)
- 💻 GitHub: [@jlgonbe](https://github.com/jlgonbe)
