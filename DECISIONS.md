# Decisiones — jlgonbe.github.io

Registro de decisiones vivas del sitio. Destila el plan de realineamiento de marca 2026
(ejecutado en PRs #2–#12). Sustituye al antiguo `.sisyphus/plans/` como fuente de verdad
de **por qué** el sitio es como es. Para el **qué/cómo** operativo, ver [`AGENTS.md`](AGENTS.md).

---

## Estrategia y marca

- **Posicionamiento hero**: identidad triple primero ("Ingeniero · Triatleta · Aprendiz"),
  Bitácora destacada después. La Bitácora es el **activo central**, no "un proyecto más".
- **Dominio**: GitHub Pages (`jlgonbe.github.io`). Sin migración a dominio propio en 2026.
- **Voz editorial**: honesta / directa / empática. Filtro de copy: "¿suena a JL o a LinkedIn
  corporativo?". Verbatim de posts reales permitido (p.ej. "Shit in, shit out").
- **Triatlón**: ángulo filosófico (constancia, enfoque), no "fotos de entrenos". Mundo Triatlón
  .Net se mantiene como proyecto anónimo, sin referencias en esta web.
- **Ejecución por fases** con confirmación explícita del usuario antes de cada una. PRs atómicos.

## Diseño visual

Dos paletas namespaceadas deliberadamente separadas (contraste identidad personal vs activo editorial):

- **Corporativa** (hero, "Otros frentes", footer): `#E5E7EB` / `#1C1C1C` / `#1F3B4D` / `#9AC8E2`.
- **Editorial Bitácora** (`#bitacora` y banda CTA): `--bitacora-bg #f4f1e1` · `--bitacora-ink #1a1a1a`
  · `--bitacora-accent #3e8e41` · `--bitacora-accent-hover #2f6f32` · `--bitacora-warm #e8a87c`
  · `--bitacora-line #e6e1cf`. Tokens tomados de la landing
  `revisar-codigo-ia.bitacoradeuningenierodesoftware.com`.
- **Tipografía**: IBM Plex Serif + Inter + IBM Plex Mono (marca personal); Lora + Inter (bloque Bitácora).
- **Contraste WCAG AA**: el accent `#3e8e41` NO pasa 4.5:1 sobre fondos claros → en texto se usa
  `--bitacora-accent-hover #2f6f32`. `.footer-copy` usa `#4b5563` (no `#6b7280`).

## Suscripción newsletter

- 2 puntos de captura: iframe en `#bitacora` + iframe en la banda CTA oscura final.
- Embed nativo Substack: `.../embed?transparent=1`, `loading="lazy"`, **altura 580px en ambos
  viewports** (espacio para botón "Suscribirse" + disclaimer sin cortes). CSS = única fuente de
  sizing (sin atributos `width`/`height` legacy en el HTML).
- Enlace "Leer más": hardcodear `https://bitacoradeuningenierodesoftware.com`
  (301 → `.substack.com`), `target="_blank" rel="noopener noreferrer"`.

## Feed de Substack

- **Estrategia**: GitHub Action refresca un JSON estático (`assets/data/substack-feed.json`);
  el frontend lee el fichero local. **Cero dependencias runtime** en el navegador (se eliminó
  `api.allorigins.win` y `axios` CDN).
- **Frecuencia**: cron `0 6 * * *` (1×/día, 06:00 UTC) + `workflow_dispatch` manual.
- **Cadena de fallback** en `scripts/refresh-substack-feed.mjs`: (1) RSS con UA de navegador →
  (2) API JSON directa `/api/v1/posts` → (3) `rss2json` keyless → (4) proxy `r.jina.ai`.
  > ⚠️ **Cloudflare devuelve 403 a las IPs de datacenter de GitHub Actions** en las capas
  > directas (1-2); desde IP residencial responden 200 (reputación de IP, no headers).
  > **Mitigación**: las capas 3-4 son proxies server-side (Substack ve la IP del proxy, no la
  > del runner) → sortean el bloqueo. `rss2json` es la capa fiable en CI; `r.jina.ai` admite
  > `JINA_API_KEY` opcional para subir su rate limit.
- **Consistencia**: `pubDate` se normaliza a ISO 8601 en todas las capas; el snapshot solo se
  escribe si una capa devuelve posts (nunca se sobreescribe el bueno con datos vacíos).
- **Frontend**: `fetch('assets/data/substack-feed.json')` con `AbortController` (timeout 10s),
  render XSS-safe (`textContent`). Fallback graceful: si falla o llega vacío, oculta la lista de
  posts y deja visible solo el iframe de suscripción + link a la Bitácora.
- **Commit del bot**: `github-actions[bot]` con `[skip ci]` para evitar loops; `concurrency` serializa runs.

## Infraestructura / deploy

- **Deploy Pages** vía workflow propio `.github/workflows/pages.yml` (reemplaza el legacy
  `pages-build-deployment`). Actions Node 24: `checkout@v6` + `configure-pages@v6` +
  `upload-pages-artifact@v5` + `deploy-pages@v5`. Sin warnings de deprecation Node 20.
- Requiere **Settings → Pages → Source = "GitHub Actions"** y **Workflow permissions = Read and write**.
- Concurrency `group: pages`, `cancel-in-progress: false`.

## SEO

- `robots.txt` + `sitemap.xml` canónicos en la raíz. OG + Twitter Cards completos, OG image 1200×630.
- Objetivo Lighthouse: Performance ~99 / Accessibility 100 / Best Practices ~100 / SEO 100.

## Principios de ejecución

- Vanilla HTML/CSS/JS, sin frameworks ni build step.
- Minimizar dependencias externas (no proxies de terceros en el navegador).
- Performance first: cada cambio mantiene o mejora Lighthouse.
- Duplicación tolerable antes que abstracción prematura.

## Decisiones pendientes

- Stack de email marketing si Substack no cubre el lead magnet "Criterio bajo presión"
  con entrega automática (candidatos: Mailerlite, Buttondown).
- Plataforma de pago para el infoproducto Q3 (Gumroad / Lemon Squeezy / Podia).
- Analytics privacy-friendly: Plausible vs GoatCounter.

## Roadmap no ejecutado (Fases 2–3)

Fase 1 (realineamiento + técnica) está completa. Pendiente y sin fecha:

- **Fase 2 — Captación**: lead magnet "Criterio bajo presión", sección "Empieza por aquí",
  página `/about` propia, analytics.
- **Fase 3 — Escalado (Q3–Q4 2026)**: landing infoproducto Tech Lead, muro de testimonios,
  Schema.org, modo oscuro, mirror SEO de posts con `rel=canonical`.
