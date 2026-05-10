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
