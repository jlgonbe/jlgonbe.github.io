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
