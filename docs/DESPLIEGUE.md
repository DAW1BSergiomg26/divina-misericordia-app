# Guía de Despliegue en Producción

## 🌐 Render

1. **Crear nuevo Web Service** en [Render](https://render.com)
2. **Conectar GitHub:**
   - Selecciona el repo: `DAW1BSergiomg26/divina-misericordia-app`
   - Branch: `main`

3. **Configuración:**
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Variables de Entorno** (en Render Dashboard > Environment):
   ```
   NODE_ENV=production
   PORT=1000 (Render asigna automáticamente)
   ADMIN_USER=sacra
   ADMIN_PASSWORD=Rufi14
   SESSION_SECRET=clave_super_secreta_larga
   EMAIL_FROM=menu2informatico@gmail.com
   EMAIL_TO=menu2informatico@gmail.com
   EMAIL_PASSWORD=tu_contraseña_app_16_dígitos
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Render instalará dependencias y hará deploy automático

## 🚂 Railway

1. **New Project** en [Railway](https://railway.app)
2. **Deploy from GitHub repo:**
   - Selecciona `DAW1BSergiomg26/divina-misericordia-app`

3. **Variables de Entorno** (Settings > Variables):
   Mismas que Render arriba.

4. **Settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Deploy automático** con cada push a `main`

## 📋 Notas Importantes

- **No subas `.env`** al repo (ya está en `.gitignore`)
- **Railway/Render inyectan `PORT`** automáticamente
- **Session secret:** Usa una cadena larga y aleatoria
- **Email:** Requiere contraseña de aplicación de Gmail (16 dígitos)
- **Backups:** En producción, `backups/` y `logs/` se crean localmente en el servidor

## 🔗 URLs de Acceso

- App: `https://tu-app.onrender.com` o `https://divina-misericordia-app.up.railway.app`
- Admin: `https://tu-app.onrender.com/admin.html`

## ⚡ Despliegue Manual (VPS/Droplet)

```bash
# Clonar
git clone https://github.com/DAW1BSergiomg26/divina-misericordia-app.git
cd divina-misericordia-app

# Instalar
npm install

# Configurar entorno
cp .env.example .env
nano .env  # Edita con tus datos

# Ejecutar con PM2 (recomendado)
npm install -g pm2
pm2 start server.js --name "divina-misericordia"
pm2 startup
pm2 save
```

## 🔒 HTTPS y Dominio Personalizado

Tanto Render como Railway ofrecen HTTPS automático.
Para dominio personalizado, sigue su documentación oficial.
