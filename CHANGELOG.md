# CHANGELOG - Divina Misericordia App

## Formato
- **Fecha:** YYYY-MM-DD
- **Archivo:** ruta del archivo
- **Cambio:** qué se modificó
- **Motivo:** por qué se hizo
- **Estado anterior:** resumen breve
- **Estado nuevo:** resumen breve
- **Riesgos:** detectados
- **Reversión:** cómo volver atrás

---

## 2026-04-30 — Configuración Inicial

### [init] Commit inicial del proyecto
- **Fecha:** 2026-04-30
- **Archivo:** todos los archivos base
- **Cambio:** Primer commit con toda la estructura de la app
- **Motivo:** Establecer línea base del proyecto
- **Estado anterior:** Proyecto sin control de versiones
- **Estado nuevo:** Proyecto versionado con Git, rama main
- **Riesgos:** Ninguno (primer commit)
- **Reversión:** `git checkout restore-2026-04-30-1200`

---

## 2026-04-30 — Auditoría y Correcciones

### [fix] Corrección de hojas de estilo faltantes
- **Fecha:** 2026-04-30
- **Archivo:** index.html
- **Cambio:** Añadidas referencias a base.css, layout.css y components.css
- **Motivo:** El HTML usaba clases definidas en esos archivos pero solo cargaba main.css
- **Estado anterior:** Estilos rotos, clases no aplicadas
- **Estado nuevo:** Todas las hojas de estilo cargadas correctamente
- **Riesgos:** Bajo — conflictos de especificidad CSS
- **Reversión:** `git checkout restore-2026-04-30-1200 -- index.html`

### [fix] Mejoras en service-worker y manifest
- **Fecha:** 2026-04-30
- **Archivo:** service-worker.js, manifest.json, src/main.js
- **Cambio:** 
  - manifest.json: start_url y scope corregidos a "./"
  - service-worker.js: añadidos assets faltantes, soporte para CDN assets, mejorado fetch handler
  - main.js: logs de registro de SW
- **Motivo:** Mejorar funcionalidad PWA y cacheo offline
- **Estado anterior:** SW incompleto, sin cacheo de CDN
- **Estado nuevo:** SW robusto con cacheo dinámico y soporte CORS
- **Riesgos:** Medio — posibles冲突 con cache de three.js si cambia versión
- **Reversión:** `git checkout restore-2026-04-30-1200 -- service-worker.js manifest.json src/main.js`

---
