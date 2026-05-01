# Divina Misericordia — Santuario Virtual

> Santuario virtual interactivo para rezar la Divina Misericordia, construido como PWA con Three.js.

[![Live Demo](https://img.shields.io/badge/Demo-online-green)](https://daw1bsergiomg26.github.io/divina-misericordia-app/)
[![GitHub](https://img.shields.io/badge/GitHub-DAW1BSergiomg26-181717?logo=github)](https://github.com/DAW1BSergiomg26/divina-misericordia-app)

## ✝ Descripción

Aplicación web progresiva (PWA) que ofrece un entorno virtual para la oración, con escena 3D renderizada con Three.js, audio ambiental, síntesis de voz para oraciones y panel de administración seguro.

## 📂 Estructura del Proyecto

```
divina-misericordia-app/
├── public/                 # Archivos públicos
│   ├── admin.html        # Login admin
│   └── admin-panel.html # Panel de administración
├── assets/
│   └── icons/           # Iconos PWA (192x192, 512x512)
├── src/
│   ├── audio/
│   │   └── audio.js     # Motor de audio y síntesis de voz
│   ├── core/
│   │   └── config.js    # Configuración central
│   ├── prayers/
│   │   ├── prayers.js   # Textos de oraciones
│   │   └── rosary.js    # Motor de oraciones
│   ├── scene/
│   │   ├── renderer.js  # Texturas procedurales
│   │   ├── scene.js     # Escena 3D (Three.js)
│   │   └── state.js     # Estado de la escena
│   ├── ui/
│   │   └── ui.js        # Interfaz de usuario
│   └── main.js          # Punto de entrada
├── styles/
│   ├── base.css         # Reset y variables
│   ├── main.css         # Estilos principales
│   ├── layout.css       # Disposición y responsive
│   └── components.css   # Componentes UI
├── scripts/
│   └── send_email_report.py  # Reporte por correo
├── backups/              # Backups automáticos (no sube a git)
├── logs/                 # Logs de cambios (no sube a git)
├── server.js             # Backend Node.js (admin, API, git auto-commit)
├── index.html           # Entrada HTML
├── manifest.json        # Configuración PWA
├── service-worker.js    # Service Worker
├── .env.example        # Ejemplo variables entorno
├── .gitignore
├── CHANGELOG.md
└── README.md
```

## 🚀 Instalación

Requisitos:
- Node.js 18+
- Python 3 (opcional, para emails)

```bash
# Clonar repositorio
git clone https://github.com/DAW1BSergiomg26/divina-misericordia-app.git
cd divina-misericordia-app

# Instalar dependencias backend
npm install

# Configurar variables entorno
cp .env.example .env
# Edita .env con tus datos reales
```

## 🏃 Ejecución Local

```bash
# Iniciar servidor (backend + frontend)
node server.js

# Abrir en navegador
http://localhost:3000
```

## 🔐 Panel de Administración

Accede a `http://localhost:3000/admin.html`:
- Usuario: `sacra`
- Contraseña: `Rufi14`

**Funcionalidades:**
- Editor de archivos HTML con preview en tiempo real
- Buscador de páginas
- Auto-refresh toggle
- Historial undo/redo (máx 20)
- Guardado con backup automático
- Git auto-commit y tag restore

## 📧 Variables de Entorno (.env)

```bash
# Admin
ADMIN_USER=sacra
ADMIN_PASSWORD=Rufi14
SESSION_SECRET=clave_secreta_sesión_larga
PORT=3000

# Email (Gmail)
EMAIL_FROM=menu2informatico@gmail.com
EMAIL_TO=menu2informatico@gmail.com
EMAIL_PASSWORD=tu_contraseña_app_16_dígitos
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

⚠️ **NUNCA subas `.env` al repositorio** (ya está en `.gitignore`)

## 💾 Backups Automáticos

Al guardar desde el panel admin:
1. Se crea backup en `backups/YYYYMMDD-HHMMSS-archivo.html`
2. Se registra en `logs/admin-changes.log`
3. Se hace git commit automático: `fix: actualizar archivo desde admin`
4. Se crea tag: `restore-YYYYMMDD-HHMMSS`

## 🔄 Restaurar una Versión Anterior

```bash
# Listar puntos de restauración
git tag

# Volver a un punto específico
git checkout restore-2026-04-30-1200

# Volver a main
git checkout main

# Revertir un commit específico (mantiene historial)
git revert <commit-hash>

# Reset hard (CUIDADO: borra cambios locales)
git reset --hard restore-2026-04-30-1200
```

## 🌐 Despliegue

### GitHub Pages (automático con push a main)
1. Ve a **Settings > Pages**
2. Selecciona **main** como fuente
3. La app estará en: `https://daw1bsergiomg26.github.io/divina-misericordia-app/`

### Otros hostings estáticos
Sube todos los archivos excepto: `node_modules/`, `.env`, `backups/`, `logs/`

## 📜 Convenciones de Commit

- `init:` configuración inicial
- `feat:` nueva funcionalidad
- `fix:` corrección de error
- `docs:` documentación
- `refactor:` mejora interna sin cambiar comportamiento
- `style:` cambios visuales
- `chore:` mantenimiento
- `restore:` punto de restauración

## 🔒 Seguridad

- Contraseñas solo en `.env` (nunca en código)
- Sesiones con cookies httpOnly
- Backend requerido para guardar cambios
- Panel admin protegido por autenticación
- `.gitignore` configurado para no subir archivos sensibles

## 📞 Requisitos

- Navegador moderno con soporte para:
  - ES Modules
  - Service Workers
  - WebGL (Three.js)
  - SpeechSynthesis API
