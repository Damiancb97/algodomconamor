# 🧶 Algodóm con Amor

Catálogo web para prendas tejidas a mano para bebés.

El proyecto está dividido en **dos aplicaciones independientes**:

- **`web/`** → Frontend público (**Next.js + TailwindCSS v4**)
- **`studio/`** → Panel de administración (**Sanity Studio v3**)

---

## 🗂️ Estructura del proyecto

```txt
algodomconamor/
├── web/                 # Aplicación Next.js (frontend)
│   ├── src/
│   ├── public/
│   └── package.json
├── studio/              # Sanity Studio (admin)
│   ├── schemaTypes/
│   ├── sanity.config.ts
│   └── package.json
└── README.md
```

> ⚠️ Importante: **NO debe existir `node_modules` en la raíz** del repo.  
> Cada app (`web` y `studio`) gestiona sus dependencias por separado.

---

## ✅ Requisitos

- Node.js + npm instalados
- (Opcional) Cuenta/proyecto de Sanity configurado para el Studio

---

## 🚀 Cómo iniciar el proyecto (paso a paso)

### 1) Iniciar la web (Next.js)

1. Entra a la carpeta `web`:
   ```bash
   cd web
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre en el navegador:
   - http://localhost:3000

> ✅ Buena práctica: **ejecuta Next.js siempre desde `web/`**, nunca desde la raíz del proyecto.

---

### 2) Iniciar el panel de administración (Sanity Studio)

1. Entra a la carpeta `studio`:
   ```bash
   cd studio
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Levanta el Studio:
   ```bash
   npm run dev
   ```

4. Abre en el navegador:
   - http://localhost:3333

---

## 📡 Acceder desde otro dispositivo (misma red)

Para permitir acceso a la web desde otro equipo conectado a la misma red:

```bash
cd web
npm run dev -- --hostname 0.0.0.0 --port 3000
```

Luego entra desde el otro dispositivo a:

- `http://IP_DEL_SERVIDOR:3000`

---

## 🗂️ Gestión de contenido (Sanity)

- Los productos se administran desde: `studio/`
- Los datos se almacenan en **Sanity Content Lake**
- La web consume contenido usando: `@sanity/client`

---

## 🎨 TailwindCSS v4 (cómo está configurado)

Este proyecto usa **Tailwind v4**. En lugar de:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Se utiliza:

```css
@import "tailwindcss";
```

### Colores de marca

Los colores personalizados se definen como **variables CSS** en:

- `web/src/app/global.css`

Ejemplo:

```css
:root {
  --color-cream: #F6EFE7;
  --color-pink: #F6C8CF;
  --color-blue: #8EC6E8;
  --color-brown: #6B4A3C;
}
```

Uso en componentes:

- `bg-[var(--color-cream)] text-[var(--color-brown)]`

> Si cambias configuración/estilos base y no se refleja: **reinicia el server dev**.

---

## ⚠️ Nota (Next 16 + Turbopack)

En algunos entornos, **Next.js 16 con Turbopack** puede fallar al resolver:

```css
@import "tailwindcss";
```

y mostrar:

- `Can't resolve 'tailwindcss'`

### ✅ Solución (arrancar con Webpack)

```bash
cd web
npm run dev -- --webpack
```

### ✅ Solución permanente (opcional)

En `web/package.json`, cambia el script:

- De:
  - `"dev": "next dev"`
- A:
  - `"dev": "next dev --webpack"`

---

## 📦 Buenas prácticas

- No subir `node_modules` al repositorio.
- Ejecutar `npm install` al clonar/instalar en un entorno nuevo.
- Mantener separadas las dependencias de `web/` y `studio/`.
- No ejecutar Next.js desde la raíz del proyecto.

---

## 🧵 Estado actual

- ✔ Web funcionando
- ✔ Studio funcionando
- ✔ Tailwind v4 configurado
- ✔ Paleta de marca aplicada
- ✔ Navbar y Footer personalizados
- ✔ Conexión con Sanity operativa
- ✔ Docker + Cloudflare Tunnel configurados

---

## 🐳 Despliegue con Docker + Cloudflare Tunnel

### Requisitos

- Docker y Docker Compose instalados
- Cuenta en [Cloudflare Zero Trust](https://one.dash.cloudflare.com) con un túnel creado

### Variables de entorno

Copia el archivo de ejemplo y rellena los valores:

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=wfz6uel0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-24

CLOUDFLARE_TUNNEL_TOKEN=tu-token-aqui
```

> El token se obtiene en: **Zero Trust → Networks → Tunnels → tu túnel → Configure**

### Arrancar

```bash
docker compose up -d --build
```

### Ver logs

```bash
docker compose logs -f
```

---

## 🏗️ Arquitectura de despliegue

```txt
Servidor Ubuntu
│
├── Docker (Next.js standalone)
│     └── Puerto interno: 3000
│     └── Expuesto en host: 127.0.0.1:3090
│
└── Cloudflared (contenedor Docker)
      └── algodomconamor.damiancb.com
      └── → http://web:3000
```