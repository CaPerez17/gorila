# LADELGORILA

Streetwear and gym essentials catalog. Cart-to-WhatsApp commerce — no payment gateway.

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your WhatsApp number
npm run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number for checkout and contact. Format: country code + number, no `+` or spaces (e.g. `573001112233` for Colombia). |
| `NEXT_PUBLIC_SITE_URL` | No | Base URL for OpenGraph and canonical links (e.g. `https://ladelgorila.com`). |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Fallback contact URL when WhatsApp is not configured (e.g. `https://instagram.com/your_account`). |

## Commands

```bash
npm run dev    # Start dev server (http://localhost:3000)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Deploy to Vercel (Preview)

This repository is ready for a **preview deployment** on Vercel. The app runs fully on seed data and does not require Sanity or other external services.

### 1. Import the repository

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** → **Project**.
3. Import your Git repository (GitHub, GitLab, or Bitbucket).
4. Vercel will auto-detect Next.js.

### 2. Environment variables

Configure these in **Project Settings → Environment Variables**:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number (e.g. `573001112233`). |
| `NEXT_PUBLIC_SITE_URL` | No | Full site URL (e.g. `https://your-project.vercel.app`). Vercel preview URLs work automatically. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Instagram profile URL when WhatsApp is not configured. |

Sanity variables (`NEXT_PUBLIC_SANITY_*`) are **optional** and not required for runtime. The app works with local seed data without them.

### 3. Build command

- **Build Command:** `npm run build`
- **Output Directory:** (leave default)
- **Install Command:** `npm install`

### 4. Deploy

Click **Deploy**. The first build may take a few minutes.

### 5. Update WhatsApp / Instagram contact

1. In Vercel: **Project → Settings → Environment Variables**.
2. Edit `NEXT_PUBLIC_WHATSAPP_NUMBER` with your number (country code + number, no `+` or spaces).
3. Optionally set `NEXT_PUBLIC_INSTAGRAM_URL` for the fallback contact link.
4. Redeploy (or enable automatic redeploys on variable change).

### Preview deployment note

This setup is intended for **client preview and review**. A “Vista previa para revisión” badge appears in the footer on Vercel preview deployments. For production, configure a custom domain and set `NEXT_PUBLIC_SITE_URL` accordingly.

## How WhatsApp Checkout Works

1. **Add to Cart**: Users browse products, select variants (color/size), and add items to the cart.
2. **Cart Page**: Users fill in checkout details (name, city, address, notes, delivery preference).
3. **Checkout via WhatsApp**: Clicking the primary CTA opens WhatsApp in a new tab with a pre-filled message containing:
   - Customer details
   - Cart items with variants and quantities
   - Total (if prices exist)

The message is URL-encoded via `encodeURIComponent()` and sent to `https://wa.me/{NUMBER}?text={message}`. The user reviews and sends the message to complete the order request.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand (cart state)

## Data

Seed data lives in `data/` (products, collections, timeline). Swap to a CMS or database later by updating the loaders in `src/lib/data/`.
