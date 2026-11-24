# UnaHur Anti-Social Net — TP2 CIU (Grupo 1)

Frontend en React + TypeScript para la red social **UnaHur Anti-Social Net**, consumiendo la API del backend incluido en este repositorio.

Permite iniciar sesión (simulada), registrarse, ver el feed de publicaciones, filtrar por etiquetas, detallar un post, comentar, ver el perfil propio y crear publicaciones.

## Integrantes (Grupo 1)

- Andino Guasch Pablo Elías
- Matías Owen Jordán
- Dolenz Elias
- Marcelo Perez Groh

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
node seed.js   # OBLIGATORIO la primera vez (ver abajo)
npm run dev
```

La API queda en `http://localhost:3001`. Detalle de endpoints: `backend/README.md`.

> **⚠️ Correr `node seed.js` es obligatorio la primera vez.** Sin el seed, la base arranca vacía: no hay usuarios para iniciar sesión, ni posts, ni etiquetas. Volver a correrlo reinicia la base y **borra los datos que se hayan creado** desde la app.

#### Por qué ampliamos el seed

El backend es el de la cátedra y lo usamos como caja negra: **lo único que modificamos es `backend/seed.js`**. El seed original traía muy pocos datos, y con eso no se podía ver funcionando buena parte del frontend. Lo ampliamos para que cada funcionalidad se pueda probar apenas se levanta el proyecto:

| Para probar | Qué incluye el seed |
| --- | --- |
| Paginación del feed ("Cargar más") | 14 posts (el feed muestra de a 5) con fechas distintas, así el orden es predecible |
| Filtro por etiquetas | 7 etiquetas; varios posts tienen más de una |
| Comentarios visibles | Algunos comentarios tienen más de 6 meses: existen en la base, pero la API no los devuelve (por ejemplo, "Mi primer post" se ve con 0 comentarios) |
| Imágenes | Posts con 0, 1, 2 y 3 imágenes (imagen única y carrusel) |
| Buscador de usuarios y perfiles | 6 usuarios con publicaciones propias |
| Error de registro | Intentar registrar un `nickName` existente (por ejemplo, `luna`) devuelve el error del servidor |

Usuarios de ejemplo: `luna`, `sol`, `tomi`, `cami`, `fede`, `agus` (contraseña `123456`). `luna` y `sol` vienen del seed original de la cátedra.

Las imágenes se cargan desde `picsum.photos`, así que hace falta conexión a internet para verlas.

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
