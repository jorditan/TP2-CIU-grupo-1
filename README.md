# UnaHur Anti-Social Net — TP2 CIU (Grupo 1)

Frontend en React + TypeScript para la red social **UnaHur Anti-Social Net**, consumiendo la API del backend incluido en este repositorio.

Permite iniciar sesión (simulada), registrarse, ver el feed de publicaciones, detallar un post, comentar, ver el perfil propio y (en progreso) crear publicaciones.

## Estructura

- `frontend/`: aplicación React con Vite, TypeScript y Tailwind.
- `backend/`: API Express + Sequelize + SQLite (caja negra para el frontend).

## URL de la API

Por defecto:

```
http://localhost:3001
```

El frontend la toma de `VITE_API_URL` o, si no está definida, usa esa URL (`frontend/src/services/apiClient.ts`).

## Cómo correr en local

### Requisitos

- Node.js 18+ (recomendado)
- npm

### 1. Instalar dependencias

Desde la carpeta raíz del repo:

```bash
npm --prefix backend ci
npm --prefix frontend ci
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Solo para crear o reiniciar la base con datos de ejemplo (borra datos existentes):
node seed.js
npm run dev
```

La API queda en `http://localhost:3001`. Detalle de endpoints: `backend/README.md`.

### 3. Frontend

En otra terminal, desde la raíz:

```bash
npm --prefix frontend run dev
```

La app queda en `http://localhost:5173`.

### Login simulado

- Contraseña fija: `123456`
- Se valida el `nickName` contra `GET /users` y la contraseña en el cliente.
- La sesión se guarda en `localStorage` y en un contexto global.

## Sincronizar con GitHub

El repositorio Git se administra desde esta carpeta principal (`frontend/` y `backend/` juntos).

```bash
git pull --ff-only
git add .
git commit -m "Describir los cambios"
git push
```

Las dependencias, variables de entorno privadas y la base SQLite local quedan fuera del repo.
