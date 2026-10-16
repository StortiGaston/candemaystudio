# CandeMayStudio — sitio web

Sitio estático (HTML + CSS + JS vanilla, sin build). Guía completa del proyecto en [CLAUDE.md](CLAUDE.md).

## Correr en local
```bash
python3 -m http.server 5173   # o: npx serve
```
Abrir http://localhost:5173. Se necesita un servidor porque el JS usa módulos ES.

## Dónde editar
- **Servicios**: `js/services-data.js` (cards, filtros y opciones del formulario salen de ahí).
- **WhatsApp y envío del formulario**: `js/site-config.js` (`whatsappNumber`, `formProvider`: `simulation` | `formspree` | `whatsapp`).
- **Datos de contacto, textos y fotos**: `index.html` (buscar `TODO`).
- **Fuentes comerciales**: poner los `.woff2` en `assets/fonts/` y descomentar los `@font-face` en `css/base.css`.
