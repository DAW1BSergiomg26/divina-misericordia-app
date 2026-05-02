# ✝ Divina Misericordia — Santuario Virtual PWA

[![Demo Render](https://img.shields.io/badge/Demo-online-green?style=for-the-badge)](https://divina-misericordia-app.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![Three.js](https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge&logo=three.js)](https://threejs.org)
[![PWA](https://img.shields.io/badge/PWA-ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![GitHub](https://img.shields.io/badge/GitHub-DAW1BSergiomg26-181717?style=for-the-badge&logo=github)](https://github.com/DAW1BSergiomg26/divina-misericordia-app)

---

## 🌐 Demo en Producción

**https://divina-misericordia-app.onrender.com**

---

## ✝ Descripción

Santuario virtual interactivo para la oración de la Divina Misericordia. Aplicación web progresiva (PWA) con escena 3D, audio ambiental y panel de administración.

---

## ✨ Características Principales

- **PWA Completa**: Instalable en móvil y escritorio
- **Escena 3D**: Renderizado con Three.js
- **Audio Ambiental**: Síntesis de voz para oraciones
- **Panel Admin**: Gestión de contenido protegida
- **Diseño Responsive**: Optimizado para móviles
- **Service Worker**: Funcionalidad offline básica

---

## 🛠 Stack Tecnológico

| Categoría | Tecnologías |
|-----------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript ES6+ |
| **3D / Visual** | Three.js, WebGL |
| **Backend** | Node.js, Express |
| **PWA** | Service Workers, Web App Manifest |
| **Despliegue** | Render.com |
| **Control Versiones** | Git, GitHub |

---

## 📸 Capturas de Pantalla

> *Capturas próximamente*

---

## 📂 Estructura Actual del Proyecto

```
divina-misericordia-app/
├── public/
│   ├── index.html           # Página principal
│   ├── admin.html           # Login administrador
│   └── admin-panel.html     # Panel de administración
├── src/                     # Código fuente frontend
├── styles/                  # Hojas de estilo CSS
├── assets/                  # Recursos (iconos, imágenes)
├── scripts/                 # Scripts auxiliares
├── server.js                # Servidor Express
├── manifest.json            # Configuración PWA
├── service-worker.js        # Service Worker
├── package.json             # Dependencias Node.js
└── .env.example             # Variables de entorno (ejemplo)
```

---

## 🚀 Instalación Local

### Requisitos
- Node.js 18 o superior
- npm

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/DAW1BSergiomg26/divina-misericordia-app.git
cd divina-misericordia-app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar servidor
npm start
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
# Administrador
ADMIN_USER=tu_usuario
ADMIN_PASSWORD=tu_contraseña

# Sesión
SESSION_SECRET=clave_secreta_larga_y_segura

# Configuración
NODE_ENV=production
PORT=3000
```

⚠️ **NUNCA subas el archivo `.env` al repositorio** (ya está en `.gitignore`)

---

## 🌍 Despliegue en Render

1. Conecta tu repositorio GitHub en [Render.com](https://render.com)
2. Selecciona **Web Service**
3. Configuración automática desde `render.yaml`
4. Añade las variables de entorno en el dashboard de Render
5. Despliegue automático con cada push a `main`

---

## 🔒 Panel de Administración

Acceso: `https://tu-dominio.com/admin.html`

**Funcionalidades:**
- Autenticación con sesiones Express
- Editor de contenido
- Guardado con respaldo automático

**Estado actual:** En proceso de ajuste de persistencia de sesión en producción.

---

## ✅ Estado Actual

### ✔ FUNCIONA
- Web pública desplegada en Render
- Servidor Express operativo
- Rutas estáticas desde `public/`
- API de login y sesión (backend)
- PWA base instalable
- Servicio de archivos estáticos

### 🔄 EN PROCESO
- Login admin desde navegador (ajuste de cookies)
- Persistencia de sesión en producción
- Implementación de Redis/Mongo store para sesiones

---

## ⚠️ Problemas Conocidos

- **Sesiones en Render**: El almacenamiento en memoria (MemoryStore) no persiste entre instancias en el plan gratuito
- **Cloudflare**: Posible interferencia con cookies `SameSite`
- **Login navegador**: Requiere ajuste fino de credenciales y trim de espacios

---

## 🗺️ Roadmap

- [ ] Redis para sesiones persistentes
- [ ] PWA offline completa (cache avanzado)
- [ ] Mejoras de experiencia móvil
- [ ] Optimización de assets (imágenes, audio)
- [ ] Panel CMS visual avanzado
- [ ] Modo oscuro
- [ ] Soporte multiidioma

---

## 🔄 Restauración / Rollback

```bash
# Ver historial de commits
git log --oneline

# Revertir un commit específico
git revert <commit-hash>

# Volver a una versión anterior (cuidado: borra cambios locales)
git reset --hard <commit-hash>

# Volver a main
git checkout main
```

---

## 🔒 Seguridad

- Contraseñas almacenadas solo en variables de entorno
- Sesiones con cookies `httpOnly`
- Panel admin protegido por autenticación
- `.gitignore` configurado para no subir archivos sensibles
- Validación de entradas en API backend

---

## 👤 Autor

**Sergio MG**

- GitHub: [@DAW1BSergiomg26](https://github.com/DAW1BSergiomg26)
- Proyecto: [divina-misericordia-app](https://github.com/DAW1BSergiomg26/divina-misericordia-app)

---

## 📄 Licencia

Proyecto con fines educativos y de devoción personal.

---

*Última actualización: Mayo 2026*
