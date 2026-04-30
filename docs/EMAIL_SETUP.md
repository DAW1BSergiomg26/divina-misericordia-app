# Configuración de Notificaciones por Correo

## Secretos requeridos en GitHub

Para que las notificaciones por correo funcionen, debes configurar estos secretos en tu repositorio:

### Pasos:

1. Ve a tu repositorio en GitHub: https://github.com/DAW1BSergiomg26/divina-misericordia-app

2. Navega a **Settings** > **Secrets and variables** > **Actions**

3. Haz clic en **New repository secret** y añade cada uno:

| Nombre del Secreto | Descripción | Ejemplo |
|-------------------|-------------|---------|
| `EMAIL_HOST` | Servidor SMTP | `smtp.gmail.com` |
| `EMAIL_PORT` | Puerto SMTP | `587` |
| `EMAIL_USER` | Tu correo de envío | `menu2informatico@gmail.com` |
| `EMAIL_PASS` | Contraseña de aplicación* | `xxxx xxxx xxxx xxxx` |
| `EMAIL_TO` | Correo destino | `menu2informatico@gmail.com` |

### Para Gmail (menu2informatico@gmail.com):

1. Ve a tu cuenta de Google > **Seguridad**
2. Activa **Verificación en dos pasos**
3. Busca **Contraseñas de aplicación**
4. Genera una nueva contraseña para "GitHub Actions"
5. Copia la contraseña de 16 caracteres y úsala como `EMAIL_PASS`

⚠️ **NUNCA pongas la contraseña real en el código o en este documento**

### Verificar que funciona:

Haz un push a la rama `main` y revisa:
- En GitHub: **Actions** > selecciona el workflow > revisa los logs
- En tu correo: deberías recibir el mensaje en `menu2informatico@gmail.com`

### Desactivar notificaciones:

Añade `[skip-notify]` en el mensaje del commit:
```bash
git commit -m "fix: corrección menor [skip-notify]"
```
