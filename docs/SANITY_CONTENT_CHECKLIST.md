# How to Add Content — Sanity CMS

## Setup (one-time)

1. Create a project at [sanity.io/manage](https://sanity.io/manage)
2. Copy `.env.example` to `.env.local` and add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   ```
3. Run `npm run dev` and open `/studio` to log in

---

## Products

1. Go to **Producto** in the Studio
2. Click **Create new**
3. Fill:
   - **Nombre (ES)** — required
   - **Slug** — generate from name (must be unique)
   - **Descripción (ES)** — required
   - **Categoría** — women | men | headwear | kids
   - **Tipo de producto** — e.g. Bodysuit, T-Shirt
   - **Imágenes** — upload at least one
   - **Variantes** — add at least one:
     - SKU (required)
     - Color, Talla
     - Precio (COP), Stock
4. Publish

---

## Collections

1. Go to **Colección**
2. Fill:
   - **Nombre (ES)**, **Slug**, **Descripción (ES)**
   - **Tipo** — drop | collection | founding
   - **Imagen**
   - **Productos** — reference products
3. For "God Is First": use type **Colección fundadora** and slug `god-is-first`
4. Publish

---

## Site Settings (marquee + manifesto)

1. Go to **Configuración del sitio** (singleton)
2. Fill:
   - **Mensajes del marquee** — array of strings (e.g. "DISCIPLINA SIN EXCUSAS")
   - **Manifiesto (ES)** — main manifesto text
   - **Manifiesto (EN)** — optional
3. Publish

---

## Lookbooks (LookbookRail slides)

1. Go to **Lookbook**
2. Create documents with:
   - **Título (ES)**, **Slug**
   - **Subtítulo**, **CTA**, **href**
   - **Imagen**
   - **Orden** — for rail order
3. Publish

---

## Timeline Events (Brand page)

1. Go to **Evento de línea de tiempo**
2. Fill year, title (ES), description (ES)
3. Add optional EN fields
4. Set **Orden** for sort order
5. Publish

---

## Stories (StoryCards)

1. Go to **Story**
2. Fill title, excerpt, slug, href (e.g. `/brand#manifesto`)
3. Set **Orden**
4. Publish
