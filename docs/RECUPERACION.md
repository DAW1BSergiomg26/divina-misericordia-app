# Guía de Recuperación y Restauración

## 📋 Listar Puntos de Restauración

```bash
# Ver todos los tags disponibles
git tag

# Ver tags con fecha de creación
git log --tags --simplify-by-decoration --pretty="format:%ci %d"

# Ver tags ordenados por fecha (más recientes primero)
git tag --sort=-creatordate
```

## 🔄 Volver a un Restore (Checkout)

```bash
# Volver a un punto específico (modo desconectado)
git checkout restore-2026-04-30-1200

# Volver a main
git checkout main
```

⚠️ **Nota:** `git checkout <tag>` te deja en estado "detached HEAD". No hagas cambios aquí a menos que sepas lo que haces.

## 🌿 Crear Rama de Recuperación

Si quieres trabajar sobre un restore sin afectar main:

```bash
# Crear rama desde un tag específico
git checkout -b recovery-from-20260430 restore-2026-04-30-1200

# Verificar
git log --oneline -3

# Si todo está bien, puedes fusionar a main:
git checkout main
git merge recovery-from-20260430
```

## 📂 Restaurar Archivos Específicos sin Perder Main

```bash
# Restaurar un solo archivo desde un tag/commit
git checkout restore-2026-04-30-1200 -- index.html

# Restaurar carpeta completa
git checkout restore-2026-04-30-1200 -- src/

# Verificar cambios
git status
git diff

# Si te gusta el cambio, commitear:
git add .
git commit -m "restore: recuperar archivos desde restore-2026-04-30-1200"
```

## 🔙 Revertir Commit (Mantiene Historial)

```bash
# Ver historial
git log --oneline -10

# Revertir un commit (crea nuevo commit que deshace cambios)
git revert <commit-hash>

# Ejemplo:
git revert 0c7562b
```

## 🗑️ Reset Hard (CUIDADO: Borra Cambios Locales)

```bash
# ⚠️ CUIDADO: Esto borra todos tus cambios locales no commiteados
git reset --hard restore-2026-04-30-1200
git push -f origin main  # Requiere permisos especiales
```

## 🏷️ Restaurar Backup Local (backups/)

Los backups automáticos se guardan en `backups/`:

```bash
# Listar backups disponibles
ls backups/

# Restaurar manualmente un backup
cp backups/20260430-1200-index.html index.html

# Verificar contenido
cat backups/20260430-1200-index.html | head -20
```

## 📝 Recuperar de GitHub (Último Recurso)

```bash
# Si tu local está totalmente roto:
git fetch origin
git reset --hard origin/main

# O clonar desde cero:
cd ..
git clone https://github.com/DAW1BSergiomg26/divina-misericordia-app.git
cd divina-misericordia-app
```

## 🚑 Flujo de Emergencia

1. **No entres en pánico**
2. `git status` - Ver qué está pasando
3. `git log --oneline -5` - Ver commits recientes
4. `git tag --sort=-creatordate | head -5` - Ver últimos restore points
5. `git checkout restore-YYYYMMDD-HHMM` - Probar un restore
6. Si funciona: `git checkout -b emergency-fix` y trabaja desde ahí
7. Si no: `git checkout main` y busca otro tag

## 📧 Contacto

Si nada funciona: menu2informatico@gmail.com
