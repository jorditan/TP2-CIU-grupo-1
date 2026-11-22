# UnaHur Anti-Social Net — Frontend

Interfaz de usuario en **React + TypeScript (Vite)** para el TP2 de Construcción de Interfaces de Usuario (UNAHUR).

## Descripción

Consume la API REST del backend del monorepo. Incluye:

- Login simulado (`nickName` + contraseña fija `123456`) con `useContext` y `localStorage`
- Registro de usuarios
- Home con feed de publicaciones y filtro por etiquetas
- Detalle de publicación (`/post/:id`) con comentarios
- Perfil del usuario logueado (`/profile`)
- Creación de nuevas publicaciones (`/create-post` y desde la barra de navegación)
- Rutas protegidas para vistas que requieren sesión

## URL de la API

```
http://localhost:3001
```

Opcional: definir `VITE_API_URL` en un `.env` del frontend.

## Correr en local

Desde la raíz del repositorio (recomendado), o desde esta carpeta:

```bash
# Dependencias (desde la raíz)
npm --prefix frontend ci

# Con el backend ya corriendo en el puerto 3001:
npm --prefix frontend run dev
```

La app queda en `http://localhost:5173`.

Instrucciones completas del monorepo (backend + frontend): ver el [README raíz](../README.md).
