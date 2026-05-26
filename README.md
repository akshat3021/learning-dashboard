# LearnOS — Student Learning Dashboard

A futuristic student dashboard built for the Frontend Intern Challenge.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture Decisions

### Server vs Client Components
- `app/page.tsx` is a **Server Component** — fetches Supabase data on the server, zero client-side data fetching
- Course tiles, activity graph, and sidebar are **Client Components** (`"use client"`) only where interactivity or browser APIs are needed
- This gives the best performance: data is ready on first paint

### Supabase Integration
- Uses `@supabase/supabase-js` with environment variables stored securely in `.env.local`
- Data fetched server-side via RSC, passed as props to client components

### Animations
- Framer Motion `Variants` with `staggerChildren` for sequential tile entrance
- Spring physics (`type: "spring", stiffness: 300, damping: 24`) on all interactions
- `layoutId` on sidebar nav for smooth active state transitions
- `useEffect` + `useState` for activity grid to avoid SSR hydration mismatch

### Responsive Design
- Desktop (>1024px): Full sidebar + 3-column bento grid
- Tablet (768-1024px): Icon-only sidebar + 2-column grid
- Mobile (<768px): Bottom navigation bar + single column stack

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and fill in your Supabase credentials
4. Run: `npm run dev`

## Environment Variables
See `.env.example` for required variables.