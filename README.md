# TP2 CIU - Grupo 1

El repositorio incluye las dos partes del proyecto:

- `frontend/`: aplicación React con Vite.
- `backend/`: API Express con Sequelize y SQLite.

## Ejecutar el proyecto

Desde la carpeta principal, instalar las dependencias:

```bash
npm --prefix backend ci
npm --prefix frontend ci
```

Para configurar el backend, copiar `backend/.env.example` a `backend/.env`.
La API usa el puerto 3001 por defecto.

En una terminal:

```bash
cd backend
# Solo para crear o reiniciar la base con datos de ejemplo; borra los datos existentes:
node seed.js
npm run dev
```

En otra terminal, desde la carpeta principal:

```bash
npm --prefix frontend run dev
```

Consultar `backend/README.md` para ver los endpoints de la API.

## Sincronizar con GitHub

El repositorio Git se administra desde esta carpeta principal, que contiene
`frontend/` y `backend/`. Ambos se versionan juntos y comparten el historial.

Antes de comenzar a trabajar:

```bash
git pull --ff-only
```

Para subir cambios de cualquiera de las dos partes:

```bash
git add .
git commit -m "Describir los cambios"
git push
```

La sincronización se realiza con `git pull` y `git push`; guardar archivos por sí
solo no los sube a GitHub. Las dependencias, las variables de entorno privadas y
la base de datos SQLite local quedan excluidas del repositorio.
