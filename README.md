# 🧶 Algodóm con Amor

Catálogo web para prendas tejidas a mano para bebés.

> 💡 **Concepto clave antes de empezar**
>
> **Sanity** es la base de datos en la nube (Content Lake) donde se almacenan los productos, imágenes y todo el contenido. No se aloja en este servidor — es infraestructura externa de Sanity.io.
>
> **Sanity Studio** es la app del panel de administración (el Docker `studio`) donde se define la estructura de esa base de datos (schemas) y se gestiona el contenido. Es solo una interfaz — si se borra el contenedor, los datos en Sanity siguen intactos.
>
> Ambos contenedores Docker (`web` y `studio`) son clientes de la misma base de datos. Ninguno almacena datos propios.

El proyecto está dividido en **dos aplicaciones independientes**:

- **`web/`** → Frontend público (**Next.js + TailwindCSS v4**)
- **`studio/`** → Panel de administración (**Sanity Studio v5**)

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
- **Project ID**: `wfz6uel0` | **Dataset**: `production` | **API Version**: `2026-02-24`
- Fichero cliente: `web/src/lib/sanity.client.ts` — `useCdn: false` (datos siempre frescos, sin caché CDN)
- Helper de imágenes: `web/src/lib/sanity.image.ts` → `urlFor(source).width(x).height(y).fit("crop"|"max").url()`
- Las páginas dinámicas usan **ISR con revalidación cada 60 segundos** (`export const revalidate = 60`)

### Esquema del producto (`studio/schemaTypes/product.ts`)

| Campo | Tipo | Obligatorio | Notas |
|---|---|---|---|
| `title` | string | Sí | Mín. 3 caracteres |
| `slug` | slug | Sí | Auto-generado desde el título |
| `description` | text | No | |
| `gender` | string | Sí | `nina` / `nino` / `unisex` |
| `category` | string | Sí | jersey / pelele / chaqueta / gorro / patucos / manta / conjunto / otro |
| `ageRanges` | array string | No | 0-1m, 1-3m, 3-6m, 6-9m, 9-12m, 12-18m, 18-24m, 2-3y |
| `price` | number | No | Si vacío → se muestra "Consultar" en la web |
| `materials` | array string | No | |
| `status` | string | Sí | `available` / `made_to_order` / `sold_out` |
| `images` | array image | No | Hotspot activado; campo `alt` por imagen |
| `gifs` | array file | No | Tipo `file` con `accept: image/gif` para conservar animación |
| `videos` | array file | No | Tipo `file` con `accept: video/*` |
| `featured` | boolean | No | Muestra el producto destacado en portada |
| `publishedAt` | datetime | No | Auto-relleno con fecha actual |

> **Por qué `gifs` es tipo `file` y no `image`**: Sanity convierte los GIFs a imágenes estáticas al procesarlos con el tipo `image`, perdiendo la animación. Con `file` se sube el archivo tal cual. En el frontend se accede a él mediante `asset.url` en lugar de `urlFor()`.

---

## 🗺️ Rutas del frontend (`web/src/app/`)

| Ruta | Archivo | Descripción |
|---|---|---|
| `/` | `app/page.tsx` | Hero + grid de productos (server component, GROQ) |
| `/productos` | `app/productos/page.tsx` | Listado completo con filtros 3 niveles (género, categoría, edad) |
| `/producto/[slug]` | `app/producto/[slug]/page.tsx` | Detalle: galería, badge estado, CTA WhatsApp |
| `/quienes-somos` | `app/quienes-somos/page.tsx` | Historia de la marca y valores |
| `/contacto` | `app/contacto/page.tsx` | Tarjetas WhatsApp, Email, Instagram |

### Componentes principales

- **`ProductsGrid`** — filtros de género / categoría / edad; cards con badge y precio o "Consultar"
- **`ProductGallery`** — tira de miniaturas, lightbox, navegación con teclado (Esc/flechas), scroll lock
- **`Navbar`** — responsive con hamburger en móvil; usa `usePathname`
- **`Footer`** — 3 columnas: marca, enlaces, contacto

---

## 🔐 Variables de entorno

**`web/.env.local`** (no commitear — usado por `npm run dev` y `npm run build`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=wfz6uel0
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-02-24
```

Para Docker, estas variables se pasan como build args y se incrustan en el bundle en tiempo de compilación (ver `web/Dockerfile` y `docker-compose.yml`).

---

## 📞 Contacto (datos reales, hardcodeados en componentes)

- **WhatsApp**: https://wa.me/34616640570
- **Instagram**: https://instagram.com/algodomconamor
- **Email**: lorenads@hotmail.com

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

Los colores personalizados se definen como **variables CSS** en `web/src/app/globals.css` y se registran como tokens Tailwind mediante `@theme inline`.

**Paleta completa** (definida en `:root`):

```css
--color-cream: #F6EFE7        /* fondo principal */
--color-cream-dark: #EDE3D7   /* fondo secundario en imágenes */
--color-pink: #F6C8CF         /* bordes, Instagram */
--color-pink-pale: #FEF5F6    /* fondo de secciones */
--color-blue: #8EC6E8         /* WhatsApp, hover */
--color-blue-pale: #EEF7FC    /* fondo de secciones CTA */
--color-brown: #6B4A3C        /* texto principal */
--color-brown-deep: #2E1A10   /* fondo footer */
```

**Tokens Tailwind disponibles** (solo los 4 principales, registrados via `@theme inline` y `tailwind.config.mjs`):

```html
bg-brand-cream   → #F6EFE7
bg-brand-pink    → #F6C8CF
bg-brand-blue    → #8EC6E8
text-brand-brown → #6B4A3C
```

Los 4 colores restantes (`cream-dark`, `pink-pale`, `blue-pale`, `brown-deep`) solo están disponibles como CSS vars arbitrarias:

```html
bg-[var(--color-cream-dark)]
bg-[var(--color-pink-pale)]
```

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

### ✅ Solución permanente (ya aplicada)

El script `dev` en `web/package.json` ya incluye `--webpack` por defecto:

```json
"dev": "next dev --webpack"
```

---

## 📦 Buenas prácticas

- No subir `node_modules` al repositorio.
- Ejecutar `npm install` al clonar/instalar en un entorno nuevo.
- Mantener separadas las dependencias de `web/` y `studio/`.
- No ejecutar Next.js desde la raíz del proyecto.

---

## 🧵 Estado actual

**Frontend (web)**
- ✔ Home con hero + grid de los últimos 8 productos (ISR 60s)
- ✔ Catálogo `/productos` con filtros en tiempo real (género / categoría / edad)
- ✔ Detalle de producto `/producto/[slug]` con galería, lightbox, badge de estado y CTA WhatsApp
- ✔ `/quienes-somos` — historia de la marca, 3 tarjetas de valores y CTA
- ✔ `/contacto` — 3 tarjetas (WhatsApp, Email, Instagram)
- ✔ Navbar responsive (desktop + hamburguesa móvil, active state por ruta)
- ✔ Footer con 3 columnas (marca, páginas, contacto)
- ✔ Metadata dinámica (título por página con template)
- ✔ Tailwind v4 + paleta de marca configurada

**CMS (studio)**
- ✔ Sanity Studio v5 desplegado en Docker
- ✔ Schema de producto completo
- ✔ Imágenes opcionales, soporte de GIFs animados y vídeos
- ✔ Conexión con Sanity Content Lake (projectId: wfz6uel0)



## 🏗️ Arquitectura en producción

```
Servidor Ubuntu
│
├── Docker — algodomconamor-web     (Next.js standalone)
│     └── Puerto interno: 3000
│     └── Expuesto en host: 127.0.0.1:3090
│
├── Docker — algodomconamor-studio  (Sanity Studio + nginx)
│     └── Puerto interno: 80
│     └── Expuesto en host: 127.0.0.1:3091
│
└── Cloudflared (instalado en el host)
      └── algodomconamor.damiancb.com → http://localhost:3090
```

## 📝 Tipos de cambios en Sanity

Hay dos tipos de cambios con flujos completamente distintos:

**1. Cambios en el schema** (estructura: campos, tipos, validaciones)
- Se editan en código: `studio/schemaTypes/product.ts`
- Para que Sanity los reconozca hay que **redesplegar el studio**:
  ```bash
  docker compose up --build --no-deps -d studio
  ```

**2. Cambios en el contenido** (productos, imágenes, textos)
- Se hacen desde la UI del panel de administración
- Al pulsar "Publicar", se envían al instante a Sanity Content Lake
- No requieren ningún `docker compose`
- La web Next.js los recoge automáticamente en el siguiente ciclo ISR (máximo 60 segundos)

---

## 🐳 Docker — comandos habituales

```bash
# Construir y levantar todo
docker compose up -d --build

# Reconstruir solo el studio (tras cambios en el schema)
docker compose up --build --no-deps -d studio

# Reconstruir solo la web (tras cambios en el frontend)
docker compose up --build --no-deps -d web

# Ver logs
docker compose logs -f

# Parar (solo detiene y elimina contenedores/redes — los datos en Sanity no se ven afectados)
docker compose down
```

## ⚠️ Notas y gotchas conocidos

- Sanity Studio puede ser matado por OOM (exit 137) en servidores con poca RAM — es un proceso muy pesado.
- Next.js muestra un warning sobre múltiples lockfiles en el workspace — no es crítico.
- `next.config.ts` tiene `output: "standalone"` — necesario para el build de Docker.
- El archivo `.env` raíz tiene `SANITY_PROJECT_ID=i9ufw8k3` (ID antiguo/incorrecto) — ignorar. El ID real es `wfz6uel0` en `web/.env.local`.