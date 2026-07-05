# TripCraft (Travel Planner)

Web-based travel planning tool — plan multi-city trips, track budget and duration in real time.

## Tech Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** for styling
- **Supabase** — Postgres, Auth, Realtime, Storage
- **Drizzle ORM** — type-safe database access
- **Zustand** — client state (instant budget/duration)
- **TanStack Query v5** — server state & optimistic updates
- **MapLibre GL JS** + OpenStreetMap — maps (no usage billing)

## Project Structure

```
├── app/                    # Next.js pages + API route handlers
│   ├── api/                # REST API surface
│   ├── auth/               # Login & OAuth callback
│   └── trips/              # Trip planner pages
├── components/             # React components
├── lib/
│   ├── db/                 # Drizzle schema + Supabase client
│   ├── auth/               # Session helpers & middleware
│   └── validation/         # Shared Zod schemas
├── stores/                 # Zustand stores
└── infra/                  # Supabase SQL migrations & RLS
```

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in Supabase credentials.
2. Run migrations in `infra/migrations/` via the Supabase SQL editor.
3. Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/trips` | Create trip |
| GET | `/api/trips/:id` | Fetch full trip |
| PATCH | `/api/trips/:id` | Update trip meta |
| POST | `/api/trips/:id/companions` | Add companion |
| POST | `/api/trips/:id/checkpoints` | Add checkpoint |
| PATCH/DELETE | `/api/trips/:id/checkpoints/:cpId` | Update/delete checkpoint |
| POST | `/api/trips/:id/budget-items` | Add budget line item |
| GET | `/api/trips/:id/summary` | Server-computed totals |
| POST | `/api/trips/:id/share` | Generate share token |
| POST | `/api/auth/link-identity` | Upgrade anonymous to registered |

See `travel-planner-technical-document.md` for the full technical design.
