# 👨‍💻 José Luis González Beltrán - Sitio Web Personal

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-success)](https://jlgonbe.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> 🌐 **[Ver sitio web](https://jlgonbe.github.io)**

Sitio web personal de José Luis González Beltrán, Ingeniero de Software y Triatleta. Una página responsive construida con tecnologías web estándar.

## 🎯 Descripción

Sitio web personal estático desarrollado con **HTML5, CSS3 y JavaScript vanilla**. Sin dependencias de frameworks externos, optimizado para simplicidad y mantenibilidad.

### ✨ Características

- **🎨 CSS personalizado**: Sin frameworks, estilos propios
- **📱 Responsive**: Adaptado para diferentes dispositivos  
- **🔄 Contenido dinámico**: Integración con feed RSS de Substack
- **🎭 Animaciones**: Efectos hover y transiciones suaves

## 🏗️ Estructura del Proyecto

```
jlgonbe.github.io/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── style.css         # Estilos personalizados
│   ├── js/
│   │   └── main.js           # Lógica de aplicación
│   ├── images/
│   │   └── profile.jpg       # Imagen de perfil
│   └── icons/                # Iconos de redes sociales
│       ├── github-logo.png
│       ├── instagram-logo.png
│       ├── linkedin-logo.png
│       ├── substack-logo.png
│       └── x-logo.png
├── README.md                 # Documentación
└── params.json              # Configuración GitHub Pages
```

## 🛠️ Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| **HTML5** | Estructura y contenido |
| **CSS3** | Estilos y diseño responsive |
| **JavaScript ES6+** | Interactividad y contenido dinámico |
| **Axios CDN** | Peticiones HTTP para feed RSS |
| **Google Fonts** | Tipografía (IBM Plex + Inter) |

## ⚙️ Funcionalidades

### 🔗 Feed RSS de Substack
- Carga automática de los 3 posts más recientes
- Manejo de errores con fallback elegante
- Proxy CORS usando `api.allorigins.win`

### 🎯 Componentes
- Cards responsivas con altura uniforme
- Botón Instagram con gradiente animado
- Iconos sociales con efectos hover
- Grid adaptativo según dispositivo

## 🚀 Desarrollo Local

```bash
# Clonar el repositorio
git clone https://github.com/jlgonbe/jlgonbe.github.io.git
cd jlgonbe.github.io

# Abrir directamente
open index.html

# O con servidor local
python -m http.server 8000
# o
npx serve .
```

## 🌐 Despliegue

Desplegado automáticamente en **GitHub Pages** desde la rama `master`:

- **URL**: https://jlgonbe.github.io
- **SSL/HTTPS**: Habilitado automáticamente
- **Despliegue**: Automático en cada push a master

## 👤 Autor

**José Luis González Beltrán**

- 🌐 Web: [jlgonbe.github.io](https://jlgonbe.github.io)
- 💼 LinkedIn: [@jlgonbe](https://linkedin.com/in/jlgonbe)
- 🐦 X/Twitter: [@jlgonbe](https://x.com/jlgonbe)  
- 📝 Substack: [Bitácora de un Ingeniero de Software](https://bitacoradeuningenierodesoftware.substack.com)
- 📸 Instagram: [@jlgonbe](https://instagram.com/jlgonbe)
- 💻 GitHub: [@jlgonbe](https://github.com/jlgonbe)
