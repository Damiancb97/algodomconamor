# 🧶 Algodóm con Amor

Web catálogo para prendas tejidas a mano para bebés.

Proyecto dividido en dos aplicaciones independientes:

- `web/` → Frontend público (Next.js + TailwindCSS)
- `studio/` → Panel de administración (Sanity Studio)

---

# 🏗️ Estructura del Proyecto
algodomconamor/
│
├── web/ → Aplicación Next.js (frontend)
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── node_modules/
│
├── studio/ → Panel de administración Sanity
│ ├── schemaTypes/
│ ├── sanity.config.ts
│ ├── package.json
│ └── node_modules/
│
└── README.md


⚠️ Importante:  
NO debe existir `node_modules` en la raíz del proyecto.

Cada aplicación (`web` y `studio`) tiene sus propias dependencias.

---

# 🚀 Cómo iniciar el proyecto

## 1️⃣ Iniciar la web (Next.js)

```bash
cd web
npm install
npm run dev


2️⃣ Iniciar el panel de administración (Sanity Studio)
cd studio
npm install
npm run dev

El studio estará disponible en:
http://localhost:3333


⚙️ Tecnologías utilizadas
🖥️ Web
Next.js (App Router)
TailwindCSS v4
TypeScript
Sanity Client (para consumir contenido)

🛠️ Studio
Sanity v3
Schema personalizado para productos
Gestión de imágenes integrada (Sanity CDN)


🎨 TailwindCSS (v4)
Este proyecto usa Tailwind v4.
En lugar de:
@tailwind base;
@tailwind components;
@tailwind utilities;

Se utiliza:
@import "tailwindcss";

Los colores personalizados se definen mediante variables CSS en:
web/src/app/global.css

Ejemplo:
:root {
  --color-cream: #F6EFE7;
  --color-pink: #F6C8CF;
  --color-blue: #8EC6E8;
  --color-brown: #6B4A3C;
}

Y se usan así en los componentes:
"bg-[var(--color-cream)] text-[var(--color-brown)]"

✅ Solución correcta

Siempre ejecutar:

cd web
npm run dev

Y nunca desde la raíz del proyecto.

📡 Acceder desde otro dispositivo (misma red)

Para permitir acceso desde otro equipo en la red:

cd web
npm run dev -- --hostname 0.0.0.0 --port 3000

Luego acceder desde:

http://IP_DEL_SERVIDOR:3000
🗂️ Gestión de contenido

Todos los productos se gestionan desde:

studio/

Los datos se almacenan en Sanity (Content Lake).

La web consume los datos mediante:

@sanity/client
📦 Buenas prácticas

No subir node_modules al repositorio.

Ejecutar npm install en cada entorno nuevo.

Mantener separadas las dependencias de web y studio.

No ejecutar Next desde la raíz del proyecto.

Reiniciar el servidor tras cambios en configuración de Tailwind.

🧵 Estado actual

✔ Web funcionando
✔ Studio funcionando
✔ Tailwind v4 configurado
✔ Paleta de marca aplicada
✔ Navbar y Footer personalizados
✔ Conexión con Sanity operativa