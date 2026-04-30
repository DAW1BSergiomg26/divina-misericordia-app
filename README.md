# Divina Misericordia — Santuario Virtual

Santuario virtual interactivo para rezar la Divina Misericordia, construido como PWA con Three.js.

## Estructura del Proyecto

```
divina-misericordia-app/
├── assets/
│   └── icons/              # Iconos PWA (192x192, 512x512)
├── src/
│   ├── audio/
│   │   └── audio.js        # Motor de audio y síntesis de voz
│   ├── core/
│   │   └── config.js       # Configuración central
│   ├── prayers/
│   │   ├── prayers.js      # Textos de oraciones
│   │   └── rosary.js       # Motor de oraciones
│   ├── scene/
│   │   ├── renderer.js     # Texturas procedurales
│   │   ├── scene.js        # Escena 3D (Three.js)
│   │   └── state.js        # Estado de la escena
│   ├── ui/
│   │   └── ui.js           # Interfaz de usuario
│   └── main.js             # Punto de entrada
├── styles/
│   ├── base.css            # Reset y variables
│   ├── main.css            # Estilos principales
│   ├── layout.css          # Disposición y responsive
│   └── components.css      # Componentes UI
├── index.html              # Entrada HTML
├── manifest.json           # Configuración PWA
├── service-worker.js       # Service Worker
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## Instalación

Esta es una aplicación frontend pura (HTML/CSS/JS). No requiere instalación de dependencias npm.

Para desarrollo local, sirve los archivos con cualquier servidor HTTP:

```bash
# Con Python
python -m http.server 8080

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8080
```

## Ejecución

1. Abre `http://localhost:8080` en el navegador
2. La app funciona como PWA: instalable y offline-ready

## Construcción

No hay paso de build. Los archivos se sirven tal cual.

Para producción, asegúrate de:
- Minificar CSS/JS (opcional)
- Verificar que el Service Worker cachea todos los assets
- Probar en `localhost` con pestaña incógnito

## Despliegue

Sube los archivos a cualquier hosting estático (GitHub Pages, Netlify, Vercel).

### GitHub Pages
1. Ve a Settings > Pages
2. Selecciona la rama `main` como fuente
3. La app estará en `https://DAW1BSergiomg26.github.io/nombre-repo`

## Restaurar una Versión Anterior

```bash
# Ver tags disponibles
git tag

# Volver a un punto de restauración
git checkout restore-2026-04-30-1200

# Volver a main
git checkout main

# Revertir un commit específico
git revert <commit-hash>
```

## Trabajar con Ramas

```bash
# Crear rama de funcionalidad
git checkout -b feature/nueva-funcion

# Crear punto de restauración antes de cambios grandes
git tag restore-YYYY-MM-DD-HHMM
git push origin restore-YYYY-MM-DD-HHMM

# Hacer cambios y commitear
git add .
git commit -m "feat: descripción del cambio"

# Subir rama
git push origin feature/nueva-funcion

# Fusionar a main (vía Pull Request recomendado)
git checkout main
git merge feature/nueva-funcion
```

## Convenciones de Commit

- `init:` configuración inicial
- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `docs:` documentación
- `refactor:` mejora interna
- `style:` cambios visuales
- `chore:` mantenimiento
- `restore:` punto de restauración

## Enviar reporte por correo

Requiere Python 3 y `python-dotenv`:

```bash
pip install python-dotenv
```

1. Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Edita `.env` con tus datos reales (usa contraseña de aplicación de Gmail).

3. Ejecuta:
```bash
python scripts/send_email_report.py
```

⚠️ No subas `.env` al repositorio (ya está en `.gitignore`).

## Requisitos

- Navegador moderno con soporte para:
  - ES Modules
  - Service Workers
  - WebGL (Three.js)
  - SpeechSynthesis API
