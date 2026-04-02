# ActiveLog

ActiveLog is a health and fitness tracker built for Web Development 2 (CPRG 306). The app focuses on simple, beginner-friendly workout and nutrition tracking with progress visibility.

## Team Split
- Paolo
- landing page
- dashboard UI
- navbar/sidebar
- reusable cards and form styling

- Sahil Nagpal
- Supabase project
- database tables
- CRUD queries
- server helpers

- Sahilpreet
- auth pages
- auth flow
- protected layout/routes
- Vercel and env setup
- external API prep folder

## Sprint 1 Goal
By the end of Sprint 1, we should have:
- Next.js app running
- repo shared with collaborators
- Vercel deployed
- basic pages created
- Supabase connected
- workout logging working at a basic level
- starter nutrition page
- shared UI structure ready

## Quick Links
- Project repository: https://github.com/sahilpreet6/activelog
- Live app: https://activelog-neon.vercel.app/
- Phase 1 document: ./PROJECT_PHASE_1.md

## Tech Stack
- Next.js (App Router)
- Tailwind CSS and shadcn/ui
- Supabase (Auth and Database)
- Nutritionix API
- ExerciseDB API
- Vercel

## Getting Started

Install dependencies:

```bash
npm install
```

Add Supabase variables in [.env.local](.env.local):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.
