# Discussioned MVP

A launch-ready Next.js front-end MVP for Discussioned.

## What works now

- Product-first homepage
- Search and category filtering
- Trending/latest tab interface
- Anonymous discussion creation
- Discussion detail modal
- Anonymous replies
- Reactions and source requests
- Private connection request interaction
- Responsive mobile/desktop design
- SEO metadata for discussioned.com

The current interactions are stored in browser state for demonstration. The included Supabase SQL file provides the production database foundation.

## Replace your current project

1. Keep a backup of your existing `discussioned-web` folder.
2. Copy all files from this project into that folder.
3. In Terminal, enter the folder and run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`.

## Publish

```bash
git add .
git commit -m "Build Discussioned MVP"
git push
```

Vercel will deploy the update automatically.

## Supabase production setup

1. Open Supabase → SQL Editor.
2. Paste and run `supabase/schema.sql`.
3. Add a `.env.local` file:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The next integration step is replacing the browser-state actions with Supabase reads and writes.
