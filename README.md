# LearnOS — Student Learning Dashboard

A futuristic, highly animated student dashboard built for the Frontend Intern Challenge.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## Architecture Decisions

### 1. Server vs Client Component Split
- **Server Component (`app/page.tsx`)**: Fetches active course records dynamically from the Supabase database. Passing data down as static props ensures that the critical page content is server-rendered, loading instantly on first paint and optimizing SEO.
- **Client Components (`use client`)**: Used selectively for interactive components like the collapsible `Sidebar`, the SVG `StatsTile` sparkline, the contributions `ActivityTile`, and animations.
- **SSR Hydration Safeguard**: Initialized client clock widgets inside `useEffect` hooks to prevent React hydration warnings between server-rendered static layouts and client timezones.

### 2. Design System: Deep Charcoal & Neon Aurora Glow
- **Theme**: Dark mode only, relying on space coal slate backdrops (`#07080a`) instead of standard flat grays.
- **Glowing Auroras**: Accentuated by three distinct radial background mesh gradients (Indigo, Teal, Pink) that shift dynamically.
- **Ambient Shadow Glows**: Course cards feature glowing dropshadow vectors matching their unique accent colors.
- **Zero Font Blurriness**: Lowered CSS backdrop blur from `16px` to `8px` and configured solid glass fills (`rgba(12, 16, 23, 0.82)`) with subpixel anti aliasing. This avoids Chrome hardware subpixel rendering artifacts that make text look blurry over highly translucent filters.

### 3. Animations & Micro-interactions
- **Staggered Page Load**: Bento tiles stagger in sequentially via Framer Motion orchestrators, translating `24px` on the Y-axis.
- **Hover States**: Cards scale up by `2.5%` using Framer Motion spring physics presets (`stiffness: 350`, `damping: 22`) for organic elasticity.
- **Segmented controls**: Active states slide and snap into position using Framer Motion `layoutId` tags.

### 4. Responsiveness
- **Desktop (>1024px)**: Expanded sidebar alongside a 3 column Bento grid.
- **Tablet (768px - 1024px)**: Collapsible icon only sidebar and a 2 column Bento grid.
- **Mobile (<768px)**: Hidden desktop sidebar replaced by a floating bottom glass navigation bar, with bento tiles stacked vertically.

---

## Setup & Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and enter your Supabase connection strings:
   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Production Build**:
   ```bash
   npm run build
   ```
