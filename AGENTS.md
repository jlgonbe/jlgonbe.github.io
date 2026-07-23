# AGENTS.md — jlgonbe.github.io

Contexto operativo para agentes de IA que trabajen en este repo. Para el **por qué** de las
decisiones de diseño/marca, ver [`DECISIONS.md`](DECISIONS.md).

## Qué es esto

Sitio web personal estático de José Luis González Beltrán. Landing de una sola página centrada
en captar suscriptores a la newsletter **Bitácora de un Ingeniero de Software** (Substack).
Desplegado en GitHub Pages en `https://jlgonbe.github.io`.

## Stack

- **HTML5 + CSS3 + JavaScript vanilla**. Sin frameworks, sin build step, sin `node_modules`.
- Única dependencia externa en runtime: Google Fonts (IBM Plex Serif/Mono + Inter + Lora).
- Scripts de tooling en Node **24+** (usan `fetch` nativo, sin deps npm).

## Estructura relevante

```text
index.html                          # Página única
robots.txt · sitemap.xml            # SEO canónico
site.webmanifest                    # PWA manifest
.github/workflows/
  pages.yml                         # Deploy a GitHub Pages (Node 24)
  refresh-substack-feed.yml         # Cron 1×/día que refresca el feed
scripts/refresh-substack-feed.mjs   # Fetch Substack → JSON estático
assets/css/style.css                # Estilos (vanilla)
assets/js/main.js                   # Lee el JSON local del feed y renderiza
assets/data/substack-feed.json      # Snapshot generado por la Action
DECISIONS.md · AGENTS.md            # Documentación de decisiones y contexto
```

## Comandos

```bash
# Servir en local
python3 -m http.server 8000        # http://localhost:8000

# Refrescar el feed manualmente (mejor desde IP residencial; ver nota 403)
node scripts/refresh-substack-feed.mjs
```

## Convenciones (respetar)

- **Vanilla siempre**: no introducir frameworks, bundlers ni build step.
- **Sin dependencias de terceros en el navegador**: nada de proxies CORS ni CDNs de librerías.
  El feed se sirve como JSON estático generado en CI.
- **JS XSS-safe**: inyectar contenido dinámico con `textContent`, nunca `innerHTML`. Usar
  `fetch` nativo + `AbortController`.
- **CSS = única fuente de sizing** para iframes (sin atributos `width`/`height` en el HTML).
- **Dos paletas namespaceadas**: no filtrar tokens `--bitacora-*` fuera de `#bitacora`/banda CTA.
- **Bugfix = cambio mínimo**. No refactorizar de paso. Mantener o mejorar Lighthouse.
- **Commits atómicos**, un PR por cambio lógico. Deploy automático en cada push a `master`.

## Feed de Substack — cadena de fallback y nota 403 en CI

`scripts/refresh-substack-feed.mjs` intenta 4 estrategias en cadena hasta que una devuelve
posts: RSS directo → API JSON directa → `rss2json` (keyless) → proxy `r.jina.ai`.

**Cloudflare bloquea con HTTP 403 las IPs de datacenter de GitHub Actions** en las rutas
directas (RSS/API); desde IP residencial responden 200 (es reputación de IP, no headers). Por
eso las capas 3-4 son **proxies server-side**: Substack ve la IP del proxy (no la del runner),
así que sortean el bloqueo. `rss2json` es la capa fiable en CI; `r.jina.ai` acepta un
`JINA_API_KEY` opcional (GitHub Secret) para subir su rate limit.

Notas:
- El script solo escribe el JSON si una capa devuelve posts → nunca sobreescribe el snapshot
  bueno con datos vacíos. Si TODAS fallan, sale con código 1 (visible) sin tocar el fichero.
- `pubDate` se normaliza a ISO 8601 en todas las capas para que el JSON sea consistente sea
  cual sea la estrategia ganadora.
- El frontend degrada con gracia: si el JSON falla o llega vacío, oculta la lista de posts y
  deja el iframe de suscripción.
- Para refrescar a mano: `node scripts/refresh-substack-feed.mjs` (desde IP residencial las
  capas directas responden 200).

## No tocar sin pedir confirmación

- `assets/images/originals/` y `assets/icons/originals/` — backups pre-optimización.
- Ajustes de `Settings → Pages` / `Workflow permissions` del repo (config fuera del código).
- La altura `580px` de los iframes Substack (requisito validado del usuario).
- El aspect 1:1 de `.profile-image` (no añadir `height: auto`).
