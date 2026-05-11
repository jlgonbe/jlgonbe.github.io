# Plan: Realineamiento de jlgonbe.github.io con marca personal 2026

> **Estado**: Aprobado, pendiente de ejecución bajo demanda del usuario.
> **Fecha**: 2026-05-08
> **Dominio**: GitHub Pages (jlgonbe.github.io) — sin migración prevista este año.
> **Posicionamiento hero**: Identidad triple primero (como ahora), Bitácora destacada después.

---

## 0. Contexto y diagnóstico (resumen ejecutivo)

La web actual es un buen "card de visita" estático pero se ha quedado pequeña frente a la marca real de 2026. Refleja "ingeniero+triatleta hobby" cuando JL ya es "**autor con voz propia construyendo un activo económico**".

### Lo alineado
- Triple identidad presente (3 cards "Lo que hago").
- Tagline coherente con misión estoica.
- Tipografía con criterio (IBM Plex Serif + Inter).
- Substack/Instagram/LinkedIn/X/GitHub presentes.
- Feed dinámico de Substack funciona.

### Gaps críticos
1. **Bitácora aparece como "un proyecto más"**, no como activo principal (contra DAFO 2026).
2. **No habla a la audiencia** (Carlos, Laura, Jorge, Marta) — solo habla de JL.
3. **Cero captación de email** — dead-end, sin funnel.
4. **Voz neutra-corporate** — no refleja tono honesto/gamberro/empático.
5. **Triatlón reducido a Instagram** — pierde el ángulo metafórico.
6. **Problemas técnicos**: sin meta description, sin Open Graph, sin favicon, imágenes pesadas (`instagram-logo.png` = 2.6 MB, `profile.jpg` = 935 KB), CSS con reglas duplicadas (`.substack-post` líneas 170-228 y 374-433), dependencia frágil de `api.allorigins.win`, `axios` por CDN innecesario.
7. **Prioridades estratégicas 2026 invisibles**: IA aplicada, transición autor independiente, producto Q3, lead magnet "Criterio bajo presión".

---

## FASE 1 — Realineamiento estratégico 🔥

> **Objetivo**: que la web grite "Bitácora" sin renunciar a identidad triple.
> **Esfuerzo**: 1-2 sesiones. **ROI**: alto, impacto inmediato.

### 1.1 Hero — identidad triple primero, Bitácora destacada después
- Mantener "Soy José Luis · Ingeniero · Triatleta · Aprendiz" como apertura.
- **Añadir bajo el hero un bloque CTA fuerte hacia la Bitácora** (no una card más, una banda destacada).
- Sub-titular con voz propia: una frase que conecte las tres identidades con el "construyo con intención".
- CTA principal del bloque Bitácora: **suscripción email** (form Substack embebido).
- CTA secundario: "Lee la Bitácora" → link a Substack.

### 1.2 Sección "La Bitácora" como núcleo (no como card de proyecto)
- Bloque grande y diferenciado visualmente (fondo distinto, más respiración).
- Contenido:
  - **Posicionamiento corto** (1-2 frases del OnePager).
  - **Líneas editoriales**: Mentalidad Dev / Lecciones Tech.
  - **3 últimos posts** (mantener feed actual, mejorado).
  - **Tarjetas "¿Te suena?"** con los 4 avatares (Carlos / Laura / Jorge / Marta) como gancho de identificación — texto en 2ª persona.
  - **Form de suscripción Substack embebido nativo** (no link externo).
  - Link discreto a `/p/home` o About de Substack.

### 1.3 Sección "Otros frentes" con jerarquía honesta
Reemplazar las 2 cards actuales ("Bitácora / Triatlón en Instagram") por 2 frentes con peso visual menor que la Bitácora:
- **Triatlón Instagram** → replantear copy: "filosofía aplicada: constancia, enfoque, superación", no "fotos de entrenos".
- **GitHub / Lab** → este sitio + skills agentes + experimentos IA.

> Nota: Mundo Triatlón .Net se mantiene como **proyecto anónimo**, sin referencias en esta web.

### 1.4 Footer-manifiesto
3-4 líneas en voz propia (honesto/gamberro/empático) que digan "qué encontrarás aquí". Ejemplo de tono — no copiar literal:
> "Aquí no hay humo ni fórmulas mágicas. Escribo sobre lo que aprendo construyendo software, entrenando triatlón y intentando no engañarme a mí mismo. Si te suena, suscríbete. Si no, también está bien."

### 1.5 Meta tags + Open Graph + Twitter Cards + favicon
- `<meta name="description">` con propuesta de valor (≤160 chars).
- Open Graph: `og:title`, `og:description`, `og:image` (crear/elegir imagen 1200x630), `og:url`, `og:type`.
- Twitter Card: `summary_large_image`.
- Favicon (.ico + .png 32/192/512 + apple-touch-icon).
- `<html lang="es">` ya está, verificar.

### 1.6 Optimización de imágenes
- `instagram-logo.png` (2.6 MB) → SVG (oficial Instagram) o PNG optimizado <20 KB.
- `linkedin-logo.png`, `x-twitter-logo.png`, `github-logo.png`, `substack-logo.png` → SVG si posible.
- `profile.jpg` (935 KB) → recomprimir a WebP + JPEG fallback, ~80-120 KB target.
- Añadir `width`/`height` explícitos para evitar CLS.
- Considerar `loading="lazy"` en imágenes bajo el fold.

### 1.7 Limpieza técnica mínima
- Eliminar reglas CSS duplicadas de `.substack-post` (líneas 170-228 vs 374-433 en `style.css`).
- Sustituir `axios` (CDN) por `fetch` nativo en `main.js`.
- Mantener proxy `allorigins.win` por ahora pero **añadir manejo de error visible** (mensaje "no se pudo cargar el feed, ve a Substack →").
- Añadir `rel="noopener"` a todos los `target="_blank"` (revisar).

### Entregables Fase 1
- `index.html` rediseñado con nueva jerarquía.
- `style.css` limpio + estilos de bloque Bitácora destacado.
- `main.js` sin `axios`, con manejo de error.
- Imágenes optimizadas en `assets/icons/` y `assets/`.
- Meta tags + favicon completos.

---

## FASE 2 — Captación y conversión 💰

> **Objetivo**: convertir visitantes en suscriptores, suscriptores en lectores fieles, lectores en compradores.
> **Esfuerzo**: 2-3 sesiones. **Cuándo**: después de validar Fase 1.

### 2.1 Lead magnet "Criterio bajo presión"
- Landing dedicada (`/criterio-bajo-presion/index.html` o sección anclada).
- Form de captación email (Substack o servicio externo si Substack no permite double opt-in con entrega de PDF).
- Definir flujo de entrega: ¿automation Substack? ¿Mailerlite/Buttondown como alternativa?
- **Decisión pendiente**: stack de email marketing si Substack se queda corto.

### 2.2 Sección "Empieza por aquí"
- 3-5 mejores posts agrupados por avatar.
- Estructura:
  - "¿Eres dev junior estancado? Empieza por estos 3."
  - "¿Eres tech lead con sobrecarga? Estos te van a sonar."
  - etc.
- Mantenimiento manual al principio, automatizable después.

### 2.3 Página `/about` propia
- Sustituye al `/p/home` de Substack como home autoral en dominio propio.
- Bio extendida, recorrido profesional, principios, cómo contactar.
- Base de la página About Me documentada en Drive.

### 2.4 Analytics privacy-friendly
- Plausible o GoatCounter (no Google Analytics — alineado con principios).
- Eventos clave: clics en "suscribir", clics en posts, scroll a Bitácora.

### 2.5 Mejorar fetch de Substack
- Evaluar GitHub Action que cachee el feed cada X horas y lo escriba como JSON estático en `/assets/data/posts.json`.
- Elimina dependencia de `allorigins.win` y mejora performance.

### Entregables Fase 2
- Landing `/criterio-bajo-presion/`.
- Sección "Empieza por aquí" en home o página dedicada.
- `/about/index.html`.
- Script de analytics integrado.
- GitHub Action de cache de feed (opcional).

---

## FASE 3 — Visibilidad y escalado 🚀

> **Objetivo**: convertir la web en plataforma de lanzamiento del infoproducto Q3.
> **Cuándo**: Q3-Q4 2026, alineado con roadmap producto.

### 3.1 Landing del infoproducto Tech Lead (avatar Marta)
- Página dedicada con propuesta de valor, módulos, precio, testimonios, CTA compra.
- Integración con plataforma de pago (Gumroad / Lemon Squeezy / Podia — decidir).

### 3.2 Muro "Lo que dicen"
- Testimonios de lectores/clientes (ya hay carpeta de agradecimientos en Drive).
- Sección visible en home + página dedicada.

### 3.3 SEO avanzado
- Sitemap.xml + robots.txt.
- Schema.org Person + Article markup.
- Posibles posts/landings indexables en español sobre temas core (mentoring, IA aplicada, criterio técnico).

### 3.4 Mejoras UX
- Modo oscuro con `prefers-color-scheme`.
- Accesibilidad: contraste WCAG AA, skip-link, ARIA labels en iconos.
- Performance: Lighthouse 95+ en Performance/Accessibility/SEO.

### 3.5 Mirror SEO de newsletter (opcional)
- Archivo de posts en jlgonbe.github.io con `rel=canonical` apuntando a Substack.
- Mejor descubribilidad por Google.

### Entregables Fase 3
- Landing infoproducto.
- Sección testimonios.
- Sitemap + robots + schema.
- Modo oscuro + a11y.
- Lighthouse score documentado.

---

## Decisiones tomadas
- **Hero**: identidad triple primero, Bitácora destacada después (no autor primero).
- **Dominio**: GitHub Pages, no migración a dominio propio en 2026.
- **Implementación**: por fases, esperando confirmación explícita del usuario para cada una.
- **Dependencias externas**: minimizar (eliminar `axios` CDN, evaluar alternativa a `allorigins.win`).
- **Form de suscripción**: iframe embed nativo de Substack (proporcionado por el usuario):
  ```html
  <iframe src="https://bitacoradeuningenierodesoftware.substack.com/embed?transparent=1"
          width="480" height="320"
          style="border: 0; background: transparent"
          frameborder="0" scrolling="no"></iframe>
  ```
  Se integrará en Sub-fase B (rediseño bloque Bitácora). Estilo `transparent=1` permite adaptarlo al fondo del bloque destacado.

## Decisiones pendientes (resolver al ejecutar)
- Stack email marketing si Substack no cubre lead magnet con entrega automática.
- Plataforma de pago para infoproducto Q3.
- Plausible vs GoatCounter para analytics.
- ¿Crear OG image custom o usar `profile.jpg` recortada?

## Principios de ejecución
- **Mejor hecho que perfecto** — Fase 1 debe poder entregarse en 2 sesiones, no 10.
- **Una sola voz** — todo el copy debe pasar el filtro "¿esto suena a JL o a LinkedIn corporativo?".
- **Sin frameworks innecesarios** — mantener vanilla HTML/CSS/JS.
- **Performance first** — cada cambio debe mantener o mejorar Lighthouse.

## Métricas de éxito (Fase 1)
- Lighthouse Performance ≥ 90 (actualmente arrastrado por imágenes 2.6MB).
- Tamaño total página inicial < 500 KB (actualmente >3 MB por imágenes).
- Open Graph válido verificado en LinkedIn Post Inspector + Twitter Card Validator.
- 1 CTA único y claro hacia suscripción Bitácora visible en primer scroll.

## Métricas de éxito (Fase 2)
- ≥ 1 conversión email/semana en primer mes post-lanzamiento.
- Bounce rate ≤ 60%.
- Tiempo medio en página ≥ 90s.

## Notas de implementación
- Mantener compatibilidad con GitHub Pages (sin build step si es posible — si se necesita, considerar GitHub Actions con Eleventy/Astro mínimo).
- Branch de trabajo: `feature/realineamiento-marca-2026`.
- Cada fase = PR separado para revisar antes de merge a `main`.

---

## Sub-fase B.2 — Refinamiento visual Bitácora + suscripción multi-punto (solicitado 2026-05-10 tras merge PR #2)

### Origen
Petición del usuario tras revisar Sub-fase B en local:
> "Quiero añadir botones de suscripción a la newsletter (iframe Substack), ajustar el estilo visual de la parte de la Bitácora para que sea consistente con la landing https://revisar-codigo-ia.bitacoradeuningenierodesoftware.com/, y que el link 'leer más' a Substack abra `bitacoradeuningenierodesoftware.com` en pestaña nueva."

### Página de referencia — tokens de diseño extraídos
Fuente: `https://revisar-codigo-ia.bitacoradeuningenierodesoftware.com/_astro/Footer.C7c0shAu.css`

**Paleta:**
- `--color-bg: #f4f1e1` (crema cálido, fondo principal)
- `--color-bg-alt: #ffffff`
- `--color-bg-soft: #faf8ef`
- `--color-ink: #1a1a1a` (texto principal)
- `--color-ink-soft: #4a4a4a`
- `--color-ink-muted: #6b6b6b`
- `--color-line: #e6e1cf` (bordes, ring)
- `--color-accent: #3e8e41` (verde botón/acento)
- `--color-accent-hover: #2f6f32`
- `--color-accent-soft: #f1f8f1` (badge background)
- `--color-warm: #e8a87c` (acento cálido secundario)

**Tipografía:**
- Sans (cuerpo): `Inter` (400/500/600/700)
- Serif (titulares): `Lora` (500/600/700, también italic 500)
- Mono: stack del sistema

**Sombras y radios:**
- `--shadow-card: 0 1px 2px #1a1a1a0a, 0 4px 12px #1a1a1a0f`
- `--shadow-cta: 0 2px 8px #3e8e4140`
- `--radius-md: 0.375rem` (botones, inputs)
- `--radius-xl: 0.75rem` (cards)
- `--radius-2xl: 1rem`

**Patrones visuales clave:**
- Badges tipo "eyebrow": `bg-accent-soft`, texto `accent`, `uppercase`, `tracking-wide`, `rounded-full`.
- Cards con `border-l-4 border-accent` (igual que avatar-cards actuales pero con el verde de marca, no `#9AC8E2`).
- Banda CTA final con `bg: var(--color-ink)` (negro #1a1a1a) + texto blanco + acento `--color-warm` para destacar palabras.
- Hover en accent: cambio a `accent-hover` con transición.

### Cambios concretos a implementar

1. **Aplicar paleta+tipografía Bitácora** (alcance a confirmar — ver Decisiones):
   - Importar `Lora` desde Google Fonts (ya está `Inter`).
   - Definir CSS variables `--bitacora-*` en `:root` con los tokens de arriba.
   - Aplicar a la sección `#bitacora`: fondo `--color-bg` (crema), titulares en `Lora`, body en `Inter`.
   - Avatar-cards: cambiar `border-left: 4px solid #9AC8E2` → `border-left: 4px solid var(--bitacora-accent)`.
   - Eyebrow `bitacora-eyebrow`: estilo badge (pill con `bg-accent-soft` + texto verde).

2. **Botones/puntos de suscripción adicionales**:
   - Mantener iframe actual dentro de `#bitacora`.
   - Añadir banda CTA final estilo "banda oscura" antes del footer-manifesto (a confirmar nº de puntos — ver Decisiones).
   - Cada iframe usa exactamente: `<iframe src="https://bitacoradeuningenierodesoftware.substack.com/embed?transparent=1" width="480" height="320" style="border: 0; background: transparent" frameborder="0" scrolling="no" loading="lazy"></iframe>`.
   - Responsive: `width: 100%; max-width: 480px;` en mobile (ya implementado en Sub-fase B).

3. **Enlace "leer más" a Substack**:
   - URL destino: `https://bitacoradeuningenierodesoftware.com` (a verificar redirección — ver Decisiones).
   - Atributos: `target="_blank" rel="noopener noreferrer"`.
   - Texto sugerido: "Leer más en la Bitácora →" (a confirmar copy).
   - Ubicación: en el bloque de últimas entradas + en la banda CTA final.

### Decisiones confirmadas (2026-05-10)

| # | Pregunta | Decisión | Notas |
|---|----------|----------|-------|
| 1 | **Alcance del rediseño visual** | **A — Solo `#bitacora`** | Contraste claro entre identidad personal (paleta actual azul) y activo Bitácora (paleta cálida editorial). Preserva trabajo Sub-fase B en hero/Otros frentes/footer. |
| 2 | **Cuántos puntos de suscripción adicionales** | **A — +1 banda CTA final** (total 2 iframes) | Iframe actual dentro de `#bitacora` + nueva banda oscura `bg: #1a1a1a` + texto blanco + iframe antes del `footer-manifesto`. |
| 3 | **URL canónica "leer más"** | **A — `https://bitacoradeuningenierodesoftware.com`** | Verificado 2026-05-10: redirige 301 → `https://bitacoradeuningenierodesoftware.substack.com/`. Seguro hardcodear el dominio custom. |
| 4 | **Copy banda CTA final** | **B — variante paralelismo con landing** | "Te llega al email. Sin spam. Cuando quieras te das de baja." (estilo directo de la referencia, voz Bitácora). |
| 5 | **Conservar `--color-accent: #9AC8E2`** fuera de `#bitacora` | **A — Paleta actual intacta** fuera de Bitácora | Coherente con decisión 1A. CSS variables `--bitacora-*` namespaceadas para no contaminar el resto. |
| 6 | **Rama destino** | **Nueva rama `feature/realineamiento-marca-2026-fase-b2` desde master** | PR #2 mergeada (`f9756d7`). Master sincronizado. Nueva PR #3 al terminar. |

### Tareas de ejecución (tras resolver decisiones)
1. Confirmar redirección `bitacoradeuningenierodesoftware.com` con `curl -I` (decisión 3).
2. Importar Google Font `Lora` en `<head>` de `index.html`.
3. Definir CSS variables `--bitacora-*` en `style.css` (paleta crema/verde + sombras).
4. Reescribir estilos `#bitacora`: fondo crema, titulares `Lora`, eyebrow tipo badge, avatar-cards con `border-l-4` verde, sombras suaves.
5. Implementar nº puntos de suscripción decidido (banda CTA final con `bg: --color-ink` negro + texto blanco + iframe).
6. Añadir bloque "leer más en la Bitácora" con enlace `target="_blank"` a la URL acordada.
7. Smoke test + render headless 320/375/1280px + validación visual con `look_at`.
8. Commit + push + PR Sub-fase B.2 (rama nueva desde `master` actualizado tras merge PR #2).

### Riesgos / consideraciones
- **Mezclar 2 paletas en una página** puede sentirse incoherente si la transición no es deliberada. Mitigación: separador visual claro (cambio de fondo) entre hero y `#bitacora`, y entre `#bitacora` y "Otros frentes".
- **Cargar 2 iframes Substack** añade peso (~2 requests externas a substack.com). Aceptable: ambos `loading="lazy"`.
- **Lora desde Google Fonts** añade ~30 KB. Aceptable: una sola familia, pesos limitados.
- **URL `bitacoradeuningenierodesoftware.com`** podría no estar configurada todavía; si falla, fallback a `.substack.com`.

---

## Sub-fase B.3 — Fix feed Substack + iconos avatares + reenfoque IA copy 🤖

> **Estado**: ✅ Implementación local completada — pendiente push + PR #4 + merge.
> **Fecha**: 2026-05-11
> **Disparador**: Usuario detecta 3 problemas tras merge PR #3:
>   1. Feed Substack no carga (proxy `api.allorigins.win` inestable).
>   2. Avatares con nombres ficticios (Carlos/Laura/Jorge/Marta) no aportan; pide iconos + descripciones.
>   3. Copy genérico; pide reenfoque hacia IA fiel a voz Bitácora.

### Diagnóstico feed Substack

- **Root cause**: `assets/js/main.js` L3 usa `https://api.allorigins.win/get?url=...` como proxy CORS. Servicio público gratuito notoriamente inestable (downtime, rate limits, cambios silenciosos de API).
- Código bien escrito (timeout, AbortController, XSS-safe). Problema = infraestructura ajena.

### Decisiones confirmadas (2026-05-11)

| # | Pregunta | Decisión | Notas |
|---|----------|----------|-------|
| 1 | **Estrategia fix feed** | **C — GitHub Action + JSON estático** | Cron 6h refresca `assets/data/substack-feed.json`. JS lee fichero local. Cero dependencias runtime. Encaja perfecto con GitHub Pages (mismo repo, mismo deploy). Filosofía F\*ck you money: no depender de servicios gratuitos ajenos. |
| 2 | **Frecuencia workflow** | **A — Cada 6h + `workflow_dispatch` manual** | 4 ejecuciones/día. Suficiente para newsletter ~2 posts/mes. Botón manual para forzar refresh tras publicar. |
| 3 | **Avatares: nombres → iconos** | **A — 4 cards con SVG inline + pain points** | Lupa / Chip / Cerebro / Engranaje. Estilo line-art consistente. SVG inline 24×24 con `currentColor` (recoloreable). Sin dependencias externas. |
| 4 | **Copy reenfoque IA** | **A — Aprobado tal cual** | Verbatim "Shit in, shit out" (post real Bitácora May 2026). Tono honesto/gamberro (cumple voz). |
| 5 | **Estrategia rama** | **A — Rama nueva `fase-b3` desde master limpio** | PR #3 mergeada (`c6bc191`). PRs atómicos. PR #4 al terminar. |

### Cambios concretos a implementar

**1. Fix feed Substack (Opción C)**:
- Crear `.github/workflows/refresh-substack-feed.yml`:
  - Triggers: `schedule: cron "0 */6 * * *"` + `workflow_dispatch`.
  - Steps: checkout, run script, commit + push si hay cambios (con `git diff --quiet` para evitar commits vacíos).
  - Permissions: `contents: write`.
- Crear `scripts/refresh-substack-feed.sh` (o Node): fetch RSS, parse XML, extraer `MAX_POSTS=3` items, escribir `assets/data/substack-feed.json` con shape `{ updated_at, posts: [{ title, link, pubDate, description }] }`.
- Refactor `assets/js/main.js`:
  - Eliminar `PROXY_URL` y `FEED_URL`.
  - Sustituir fetch RSS+XML parse por `fetch('assets/data/substack-feed.json')`.
  - Mantener fallback elegante (link directo a Substack si JSON falla).
  - Mantener XSS-safety (`textContent`).
- Generar primer `assets/data/substack-feed.json` manualmente para que la web cargue desde el primer deploy (antes del primer cron).

**2. Iconos avatares**:
- En `index.html` reemplazar las 4 `.avatar-card` (Carlos/Laura/Jorge/Marta) por:
  - Bloque `<div class="avatar-card-icon">` con SVG inline 24×24 + título pain-point + descripción.
  - Mantener `border-left` verde (`var(--bitacora-accent)`) ya implementado.
- Iconos (line-art Lucide-style):
  - 🔍 Lupa → "Aprueban PRs sin entenderlos" / "El test pasa, el linter calla, mergeas. Tres semanas después, alguien paga la factura en producción."
  - 🤖 Chip → "Copilotean en automático" / "Tab, tab, tab. Funciona. ¿Por qué funciona? Ni idea. Y mañana toca debuggearlo a ciegas."
  - 🧠 Cerebro → "Saben que la IA no es magia" / "Quieren usarla como palanca, no como muleta. Buscan criterio, no atajos."
  - 🛠️ Engranaje → "Han visto arder un viernes" / "Saben que la deuda técnica con firma de IA pesa igual. Quieren herramientas, no humo."
- CSS: añadir `.avatar-card-icon svg` con `width: 32px; height: 32px; color: var(--bitacora-accent); margin-bottom: 0.5rem;`.

**3. Copy reenfoque IA**:
- En `#bitacora`:
  - Eyebrow (mantener pill): `LA BITÁCORA DE UN INGENIERO DE SOFTWARE`.
  - Titular (Lora): `La IA no te hace mejor ingeniero. Amplifica al que ya lo es.`
  - Body (Inter): "Una newsletter para developers que ya no se tragan el "10x productivity" ni el humo del último framework. Aquí hablamos de criterio, de revisar código que escupe la IA antes de aprobarlo, y de por qué la mayoría de PRs generados rompen producción tres semanas después. Sin atajos. Sin oráculos. El porqué, no solo el cómo."
- Subtítulo grid: `¿Te suena?` (mantener).
- CTA encima del iframe: "Si has leído hasta aquí, ya sabes que esto no va de herramientas. Va de pensar. **Suscríbete y deja de programar en automático.**"
- Banda CTA oscura final:
  - Eyebrow (warm orange): `ÚLTIMA LLAMADA`.
  - Titular: `La IA no arregla el pensamiento mediocre. Lo amplifica.` (verbatim del post "Shit in, shit out").
  - Body: "Si quieres que te amplifique el bueno, llevas 30 segundos para suscribirte. Te llega al email cuando publico. Sin spam. Cuando quieras te das de baja."
  - Link: "Leer más en la Bitácora →"

### Tareas de ejecución
1. Crear `.github/workflows/refresh-substack-feed.yml` (cron 6h + dispatch).
2. Crear `scripts/refresh-substack-feed.{sh|js}` con fetch RSS + parse + write JSON.
3. Generar primer `assets/data/substack-feed.json` ejecutando script en local.
4. Refactor `assets/js/main.js` para leer JSON local.
5. Reemplazar 4 avatares en `index.html` por iconos SVG inline + pain points.
6. Actualizar copy `#bitacora` (titular + body + CTA encima iframe).
7. Actualizar copy banda CTA oscura final.
8. CSS: añadir estilos para `.avatar-card-icon svg`.
9. Smoke test + render headless 320/375/1280 + validación visual con `look_at`.
10. Actualizar README (eliminar mención `api.allorigins.win`, documentar workflow + nuevo copy).
11. Commit + push + PR #4 Sub-fase B.3.

### Riesgos / consideraciones
- **Workflow GitHub Action requiere `contents: write`**: verificar permisos del repo (Settings → Actions → Workflow permissions).
- **Commits automáticos del bot**: usar `github-actions[bot]` como autor. Filtrar con `[skip ci]` en mensaje para evitar loops.
- **JSON cacheado por GitHub Pages**: añadir `?v=` con timestamp en fetch, o aceptar caché de hasta 10 min de Pages CDN (no crítico).
- **Iconos line-art consistentes**: usar mismo stroke-width y estilo Lucide/Heroicons para coherencia visual.
- **Verbatim "Shit in, shit out"**: confirmado como título de post real (May 2026), NO inventado.
- **Tono potencialmente confrontacional**: copy aprobado tal cual por usuario; alineado con voz Bitácora ("colleja", "humo", "loco").

### Cambios ejecutados (2026-05-11)

- ✅ `.github/workflows/refresh-substack-feed.yml` — cron `0 */6 * * *` + `workflow_dispatch`, `permissions: contents: write`, `concurrency` group, commit del bot con `[skip ci]`.
- ✅ `scripts/refresh-substack-feed.mjs` — Node 20+ (sin deps npm), fetch nativo, parser RSS por regex, decoder de entidades HTML, escribe `assets/data/substack-feed.json` con shape `{ source, updated_at, count, posts: [...] }`.
- ✅ `assets/data/substack-feed.json` — primer snapshot generado en local: 3 posts reales (Shit in, shit out / Requisitos vagos, desastre asegurado / La farmacéutica que no quería pensar demasiado).
- ✅ `assets/js/main.js` — refactor completo: eliminado `PROXY_URL` y parser XML; ahora hace `fetch('assets/data/substack-feed.json')` con `AbortController` (timeout 10s), `MAX_POSTS=3`, render XSS-safe con `textContent`, fallback elegante con link directo a Substack.
- ✅ `index.html` — 4 `.avatar-card` con nombres reemplazados por bloques `.avatar-card` con SVG inline 24×24 (lupa / chip / cerebro / engranaje) + `.avatar-pain` (titular pain-point) + `.avatar-text` (descripción).
- ✅ `index.html` — copy `#bitacora` actualizado: titular "La IA no te hace mejor ingeniero. *Amplifica al que ya lo es.*" + body verbatim + CTA "Suscríbete y deja de programar en automático" encima del iframe.
- ✅ `index.html` — banda CTA oscura final con titular "La IA no arregla el pensamiento mediocre. *Lo amplifica.*" + body 30 segundos + link "Leer más en la Bitácora →".
- ✅ `assets/css/style.css` — nuevos estilos: `.avatar-icon` (32×32, `color: var(--bitacora-accent)`), `.avatar-pain` (Lora 1.15rem 600), `.bitacora-title-accent` (verde + itálica).
- ✅ Smoke test local (`python3 -m http.server 8765`): index, main.js, JSON y CSS devuelven 200.
- ✅ Render headless Chrome 320/375/1280 + validación visual con `look_at`: layout limpio, sin overflow, iconos visibles, "Shit in, shit out" como primer post, banda CTA oscura confirmada en desktop.
- ✅ `README.md` actualizado: eliminada mención `api.allorigins.win`; documentado workflow GH Action + JSON estático + nuevo copy + estructura `.github/workflows/` y `scripts/`.

### Pendiente

- ⏳ Commit atómico Sub-fase B.3 + push + abrir PR #4.
- ⏳ Merge PR #4 (acción usuario).
- ⏳ Verificar Settings → Actions → Workflow permissions = "Read and write" en el repo tras push.
- ⏳ Validar primera ejecución del workflow en CI real (manual dispatch tras merge).
- ⏳ OG en producción + Lighthouse tras merge.

### Ajustes adicionales en PR #4 (mismo branch, antes del merge)

- ✅ `cron` cambiado de `0 */6 * * *` (cada 6h) a `0 6 * * *` (1×/día a 06:00 UTC) — feedback usuario: "vale con refrescarlo una vez al día".
- ✅ `actions/checkout@v4` → `@v6` y `actions/setup-node@v4` → `@v6` (versions latest, Node 24-ready) — fix deprecation warning Node.js 20 actions deprecadas (effective June 2026).
- ✅ `node-version: "20"` → `"24"` (LTS actual, evita futuro warning de runtime).
- ✅ README sincronizado: `cron 0 6 * * *` (1×/día), `Node 24+`, `GitHub Actions + Node 24`.
- ✅ Verificado vía `gh api`: `default_workflow_permissions=write` ya configurado en el repo (no requiere acción manual del usuario).
- ✅ Iframes Substack `height="320"` → `"400"` (ambos: bloque Bitácora + banda CTA oscura final) — fix botón "Suscribirse" + disclaimer legal cortados; verificado headless desktop 1280px.
- ✅ Fallback graceful en `main.js`: si feed falla o vacío, oculta `#substack-posts` + `.latest-posts-title`. Mantiene visible iframe suscripción + link "Leer más en la Bitácora →" — verbatim requisito usuario; verificado headless con feed `count=0`.
- ✅ Eliminada función `renderError` (mensaje feo) y CSS-class `.substack-error*` ya no usado (cleanup pendiente en estilo si se quiere).

### Hotfix post-merge — workflow 403 desde IPs de runners (PR #5)

- **Síntoma**: primer `workflow_dispatch` manual tras merge PR #4 falló con `HTTP 403 Forbidden` al fetch del RSS.
- **Causa**: Cloudflare bloquea por reputación de IP (datacenter Azure US del runner GitHub Actions). Desde cualquier IP residencial responde 200 con cualquier UA.
- **Fix**: refactor `scripts/refresh-substack-feed.mjs` con estrategia 2-capas:
  1. Intenta RSS con UA navegador realista (Chrome 124 Linux).
  2. Si RSS falla (403/404/timeout), fallback automático a `/api/v1/posts?limit=3` (API JSON oficial Substack, sin restricciones anti-bot).
- **Mapping API → schema interno**: `canonical_url` → `link`, `post_date` → `pubDate`, resto idéntico.
- **Verificado local**: ambas rutas funcionan; RSS devuelve 16 items (slice 3), API devuelve 3 directos.
- **Branch**: `hotfix/substack-403-fallback`.

### PR #6 — Estilo posts paleta editorial Bitácora (mergeada 2026-05-11)

- **Branch**: `style/bitacora-posts-palette`.
- **Problema**: tarjetas `.substack-post*` heredaban estilos de la paleta corporativa antigua (azules, sin tipografía editorial), rompiendo consistencia visual con el resto del bloque Bitácora.
- **Cambios** (`assets/css/style.css` líneas 279–344):
  - `.substack-post` → fondo `var(--bitacora-bg-alt)`, borde `var(--bitacora-line)`, sin sombra azul.
  - `.substack-post-title` → Lora 1.15rem, `color: var(--bitacora-ink)`, hover `var(--bitacora-accent)`.
  - `.substack-post-date` → Inter 0.85rem, `color: var(--bitacora-ink-muted)`.
  - `.substack-post-link` → `color: var(--bitacora-accent)`, hover `var(--bitacora-accent-hover)`.
  - Eliminado emoji decorativo y cualquier referencia a azules de la paleta corporativa.
- **Validado**: render headless desktop 1280px + iPhone 13 (390×844) — paleta unificada, jerarquía clara, hover legible.

### PR #7 — Iframe Substack 580px ambos viewports (mergeada 2026-05-11)

- **Branch**: `style/substack-iframe-580px`.
- **Problema**: con `height=400` (PR #4) el botón "Suscribirse" + disclaimer legal Substack quedaban cortados en algunos zooms y mobile.
- **Cambios** (`assets/css/style.css`, +2/-2 líneas):
  - Línea 576 (desktop): `.substack-embed-wrapper iframe { height: 320px → 580px; }`.
  - Línea 805 (mobile breakpoint): `.substack-embed-wrapper iframe { height: 360px → 580px; }`.
- **Decisión**: misma altura ambos viewports — usuario validó visualmente con captura que 580px deja respiración para botón + disclaimer en cualquier device width.
- **Validado**: usuario confirmó captura desktop + mobile, sin solapamientos, sin scroll interno innecesario.

### PR #8 — Hotfix Jina fallback (3ª capa) (mergeada 2026-05-11)

- **Branch**: `hotfix/substack-jina-fallback`.
- **Síntoma post-PR #5**: ejecución CI volvió a fallar con 403 también en API directa (`/api/v1/posts`); Cloudflare endurece bloqueo a IPs Azure runners.
- **Fix**: añadir 3ª capa de fallback usando `r.jina.ai` como proxy de lectura.
  - URL: `https://r.jina.ai/<API_URL_ABSOLUTA>` (proxy concatena scheme+host+path en la URL).
  - Header crítico: `X-Return-Format: text` — fuerza Jina a devolver el body upstream sin renderizado markdown.
  - Wrapper Jina: respuesta llega como `{code, status, data: {text: "<json-string>"}}` → desempaquetar `wrapper.data.text` (string) → `JSON.parse(...)` → pasar a `mapApiPosts()`.
- **Refactor `scripts/refresh-substack-feed.mjs`** (+46/-10): `main()` reescrito como loop de estrategias `[rss, api, jina]`; primera estrategia que devuelve ≥1 post gana; metadatos `source` y `fetchedAt` añadidos al JSON output.
- **Validado local end-to-end**: forzando fallo de capas 1+2 (mock 403), capa 3 Jina devuelve `[3/3] Jina OK: 3 items` con datos íntegros.

### PR #9 — Workflow Pages propio Node 24 (mergeada 2026-05-11)

- **Branch**: `ci/pages-deploy-node24`.
- **Problema**: workflow legacy `pages-build-deployment` (autogenerado por GitHub al usar "Deploy from a branch") usa Node 20 internamente y muestra warning permanente de deprecation; sin forma de actualizarlo desde el repo.
- **Solución**: nuevo workflow propio `.github/workflows/pages.yml` reemplazando el modelo legacy:
  - `actions/checkout@v6.0.2` (Node 24).
  - `actions/configure-pages@v6.0.0` (Node 24).
  - `actions/upload-pages-artifact@v5.0.0` (Node 24).
  - `actions/deploy-pages@v5.0.0` (Node 24).
  - Concurrency `group: pages, cancel-in-progress: false` (no abortar deploys a medias).
  - Permisos mínimos: `contents: read`, `pages: write`, `id-token: write`.
  - Triggers: `push: master` + `workflow_dispatch`.
- **Acción manual usuario**: Settings → Pages → Source = "GitHub Actions" (cambio del modelo legacy "Deploy from a branch").
- **Validado en producción**: usuario confirmó run #1 success (build 5s + deploy 9s = 28s total) sin warnings.
- **Pregunta resuelta**: el step `report-build-status` del workflow legacy NO se replica — era telemetría exclusiva del modelo "Deploy from a branch" (`POST /pages/telemetry`); el modelo Actions usa `/pages/deployments` vía `actions/deploy-pages@v5` que ya cubre el reporte de estado.

### Pendientes globales tras PR #9

> Algunos puntos quedan superados por Sub-fase B.4 (mobile 375px) más abajo y se vuelven a tratar en su sección dedicada.

- ⏳ Validar primer run real del workflow `refresh-substack-feed.yml` en CI vía cadena Jina (esperar cron `0 6 * * *` o lanzar `workflow_dispatch` manual) — confirmar `assets/data/substack-feed.json` regenerado con `source: "jina"` o `source: "rss"` según resuelva.
- ✅ Mobile responsive global a 375px → abordado en **Sub-fase B.4** (ver más abajo).
- ⏳ Validación OG en producción (LinkedIn Post Inspector / Twitter Card Validator / Facebook Debugger) con URL definitiva.
- ⏳ Lighthouse audit completo (Performance / Accessibility / Best Practices / SEO).
- ⏳ Sub-fase C del plan original (si aplica tras revalidación de scope).
- ⏳ Fases 2 (Captación y conversión 💰) y 3 (Visibilidad y escalado 🚀).

---

## Sub-fase B.4 — Hardening responsive 375px (solicitado 2026-05-11 tras merge PR #10)

### Contexto

Auditoría de responsive a viewport iPhone SE (375px) para cerrar Fase 1 antes de validar OG en producción y ejecutar Lighthouse audit.

### Diagnóstico

- Agente `explore` auditó la home y reportó 12 puntos de mejora responsive (selectores, líneas, fixes sugeridos).
- Validación técnica con detector JS in-browser (`getBoundingClientRect` sobre todos los elementos): **0 offenders reales** (`docScrollW == bodyScrollW == VW`). No hay overflow horizontal real.
- Las anomalías visuales en screenshots iniciales (texto cortado uniformemente) eran **artefactos de Chrome headless**: con `--force-device-scale-factor=2 --window-size=375` el viewport CSS efectivo se renderiza como 500px, no 375px.
- **Conclusión**: el sitio NO tiene overflow real a 375px en navegador real. Aun así se aplican mejoras defensivas para robustez ante strings largos editoriales no controlables, iframes externos con atributos legacy y futuras imágenes que pudieran exceder contenedor.

### Cambios aplicados

**`assets/css/style.css`** (9 ediciones):

- ✅ `.main-title` (L69) — `+overflow-wrap: anywhere` (defensivo strings largos hero).
- ✅ `.section-title` (L99) — `+overflow-wrap: anywhere`.
- ✅ `.card-title` (L145) — `+overflow-wrap: anywhere`.
- ✅ `.bitacora-title` (L474) — `+overflow-wrap: anywhere` (titulares editoriales largos).
- ✅ `.bitacora-cta-band-title` (L636) — `+overflow-wrap: anywhere`.
- ✅ `.card` (L135) — `+min-width: 0` (permite shrink en grid/flex sin desbordar).
- ✅ `.avatar-card` (L514) — `+min-width: 0` (mismo fix para tarjetas pain-points).
- ✅ `.profile-image` (L62) — `+max-width: 100%` (defensivo; preservado `border-radius: 50%` y aspect 1:1, NO se añadió `height: auto`).
- ✅ `.substack-embed-wrapper iframe` (L573) — `width: 480px` → `width: 100%; max-width: 480px`. Preservado `height: 580px` (requisito explícito usuario).

**`index.html`** (2 ediciones):

- ✅ Iframe Substack bloque Bitácora (~L121) — eliminados atributos legacy `width="480" height="400"`. CSS controla sizing exclusivamente.
- ✅ Iframe Substack banda CTA oscura (~L202) — mismo fix.

### Verificación

- ✅ Detector JS in-browser sobre el sitio: 0 offenders, `docScrollW == VW` (sin overflow horizontal).
- ✅ Sin regresión visual en desktop (cambios aditivos / defensivos).
- ✅ `height: 580px` iframe Substack preservado en ambos puntos.
- ✅ Aspect 1:1 `.profile-image` preservado.
- ✅ `git diff --stat`: 2 files changed, 10 insertions(+), 6 deletions(-).

### Pendiente

- ⏳ Merge PR #11 `style/mobile-375-fixes` (acción usuario).
- ⏳ Validación OG producción tras merge: LinkedIn Post Inspector, Twitter Card Validator, Facebook Sharing Debugger.
- ⏳ Lighthouse audit baseline (Performance, Accessibility, Best Practices, SEO).
- ⏳ Documentar resultados Lighthouse en este plan + posibles fixes derivados.

### Decisiones clave

- Aplicado fix completo (9 mejoras CSS + 2 HTML) en lugar de solo el crítico (iframe), por decisión del usuario "Fix completo".
- Eliminados atributos HTML legacy de iframes; CSS = single source of truth.
- NO añadir `height: auto` a `.profile-image` para no romper el círculo del avatar.
- Iframe Substack height 580px confirmado en ambos viewports (requisito usuario sesión anterior, preservado).

---

## Sub-fase B.5 — Audit OG + Lighthouse baseline producción (2026-05-11)

### Contexto

Audit de cierre Fase 1 sobre `https://jlgonbe.github.io/` (producción actual, **pre-merge PR #11**) para validar OG meta tags, manifest/favicons y obtener baseline Lighthouse.

### Resultados OG / SEO / Manifest

✅ **Meta tags Open Graph completos**:
- `og:type=website`, `og:locale=es_ES`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:width=1200`, `og:image:height=630`, `og:image:alt`.

✅ **Twitter Card**:
- `twitter:card=summary_large_image`, `twitter:site=@jlgonbe`, `twitter:creator=@jlgonbe`, `twitter:title`, `twitter:description`, `twitter:image`.

✅ **OG image producción**:
- `https://jlgonbe.github.io/assets/images/og-image.jpg` → HTTP 200, JPEG 1200×630, 60781 bytes, content-type correcto.

✅ **Manifest PWA**:
- `site.webmanifest` → HTTP 200, JSON válido, theme_color `#1F3B4D`, 2 icons (192 + 512).

✅ **Favicons** (todos HTTP 200): `favicon.ico`, `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png`.

✅ **Profile images**: `profile.webp` + `profile.jpg` HTTP 200 (referencia fallback `<picture>`).

❌ **Hallazgos a corregir**:
- `https://jlgonbe.github.io/robots.txt` → HTTP 404 (no existe en repo).
- `https://jlgonbe.github.io/sitemap.xml` → HTTP 404 (no existe en repo).

### Resultados Lighthouse (mobile + desktop)

**MOBILE** (Moto G Power emulado, 4G slow):
| Categoría | Score |
|-----------|-------|
| Performance | **99** |
| Accessibility | **95** |
| Best Practices | **96** |
| SEO | **100** ✅ |

Métricas core: FCP 1.8s · LCP 1.8s · TBT 0ms · CLS 0.02 · SI 1.8s · TTI 1.8s.

**DESKTOP** (1920×1080, throttling no):
| Categoría | Score |
|-----------|-------|
| Performance | **94** |
| Accessibility | **95** |
| Best Practices | **96** |
| SEO | **100** ✅ |

Métricas core: FCP 0.7s · LCP 0.7s · TBT 0ms · CLS 0.138 (mejorable) · SI n/a.

### Issues accionables detectados (priorizar como Sub-fase B.6)

1. ⚠️ **WCAG AA color-contrast fallido (3 elementos)** — el accent verde `#3e8e41` falla ratio 4.5:1 sobre fondos claros:
   - `.bitacora-eyebrow` `#3e8e41` / `#f1f8f1` → ratio **3.77** (necesita ≥4.5)
   - `.latest-posts-link` `#3e8e41` / `#f4f1e1` → ratio **3.59** (necesita ≥4.5)
   - `.footer-copy` `#6b7280` / `#e5e7eb` → ratio **3.9** (necesita ≥4.5)
   - **Fix propuesto**: usar `--bitacora-accent-hover: #2f6f32` (más oscuro) en estos 3 selectores; oscurecer `.footer-copy` a `#4b5563` o similar.

2. ⚠️ **Aspect ratio incorrecto** en `assets/icons/linkedin-logo.png`:
   - Mostrado 24×24 (1.00), archivo real 128×109 (1.17). Distorsión visual ligera.
   - **Fix propuesto**: regenerar PNG con aspect 1:1 (128×128) o ajustar CSS `object-fit: contain`.

3. ⚠️ **CLS desktop = 0.138** (tolerable pero >0.1 = "needs improvement"):
   - Probable causa: iframe Substack sin `height` reservado en CSS antes de cargar (aunque `height: 580px` está en CSS, el iframe puede causar shift al hidratar el contenido externo). Investigar si añadir `min-height` ayuda.

4. ⚠️ **Falta robots.txt + sitemap.xml** (no afectan score Lighthouse mobile actual = 100, pero best practice SEO):
   - Crear `robots.txt` simple con `User-agent: * / Allow: / / Sitemap: https://jlgonbe.github.io/sitemap.xml`.
   - Crear `sitemap.xml` con 1 URL (home).

### Validators externos pendientes (acción usuario tras merge)

- ⏳ [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fjlgonbe.github.io%2F) — pegar URL `https://jlgonbe.github.io/`.
- ⏳ [Twitter/X Card Validator](https://cards-dev.twitter.com/validator) — herramienta deprecada por X; alternativa: postear test desde `@jlgonbe` y verificar render.
- ⏳ [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fjlgonbe.github.io%2F) — scrape + verificar imagen 1200×630.

### Reportes guardados

- `/tmp/lighthouse-jlgonbe/jlgonbe-prod.report.html` (mobile, 974KB navegable).
- `/tmp/lighthouse-jlgonbe/jlgonbe-prod.report.json` (mobile, raw).
- `/tmp/lighthouse-jlgonbe/jlgonbe-prod-desktop` (desktop JSON).

### Decisión Fase 1

✅ **Fase 1 técnicamente completada**. Scores Lighthouse excelentes (SEO 100 / Perf 99 mobile). Issues residuales son **mejoras incrementales** no bloqueantes:
- Accessibility 95 → potencial 100 con fixes contraste.
- Best Practices 96 → potencial 100 con fixes aspect ratio + cache headers (limitados por GitHub Pages).
- CLS 0.138 desktop → mejora opcional iframe.
- robots.txt + sitemap.xml → buenas prácticas SEO.

Estos quedan agendados como **Sub-fase B.6 (opcional, post-merge PR #11)** para empuje a 100/100/100/100.
