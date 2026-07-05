# Technical Design Document: Travel Planner Web App

**Codename:** TripCraft
**Author:** Senior Software Engineer
**Version:** 2.0 (adds Authentication, $0-cost architecture)
**Date:** July 2026

---

## 1. Overview

TripCraft is a web-based travel planning tool. A user can:

- Browse/use the app **without signing up** (anonymous session)
- **Optionally create an account** to save trips permanently, sync across devices, and share/collaborate
- Pick a destination, add travel companions, define checkpoints (multi-city route), add notes, pick lodging/spots to stay
- Set a total trip budget and duration (days), both updating **in real time** as the itinerary changes

The system must run at **$0 infrastructure cost** at the current scale, support **many concurrent users**, and be architected so heavier tiers can be turned on later (paying only when actual usage demands it — not before).

---

## 2. Goals & Non-Goals

### Goals
- Zero forced sign-up, but a real, secure authentication system available for users who want persistence/sync.
- Real-time, client-perceived instant feedback on budget & trip duration.
- **$0 running cost**, using only free tiers of managed services (no self-hosted servers billed by the hour).
- Clean separation of concerns so paid tiers/features can be turned on later without a rewrite.
- Mobile-responsive from the start.

### Non-Goals (v1)
- Payment processing / bookings (future).
- Native mobile app (future; API is designed to support it).
- Real-time multi-user co-editing of the *same* trip (future — see roadmap).

---

## 3. Functional Requirements

| # | Feature | Notes |
|---|---------|-------|
| 1 | Use app with no account | Anonymous session (signed cookie) |
| 2 | Sign up / log in | Email+password and OAuth (Google), optional at any time |
| 3 | Claim anonymous trips on signup | Anonymous trips are linked to the new account, not lost |
| 4 | Select destination(s) | Autocomplete via free geocoding |
| 5 | Add travel companions | Simple name + optional avatar/color |
| 6 | Add checkpoints | Ordered list of stops with dates, lat/lng, notes |
| 7 | Add notes | Free-text, attachable to trip or checkpoint |
| 8 | Select stay/spots | Search + pick lodging per checkpoint |
| 9 | Budget tracking | Manual line items + auto-rollup; recalculates instantly |
| 10 | Trip duration | Auto-derived from checkpoint dates; updates instantly |
| 11 | Persist & resume | Trip accessible via link, localStorage, or account login |
| 12 | Share trip | Read-only or edit link, no account required for the viewer |

---

## 4. Non-Functional Requirements

- **Latency:** Budget/day recalculation perceived as instant (< 100ms client-side).
- **Cost:** $0 at current scale — every managed service used must have a free tier that covers expected usage (see §9).
- **Scalability:** Serverless-first so we scale to zero and to load automatically, without paying for idle compute.
- **Security:** Passwords never touch our own servers unhashed; sessions are signed JWTs; row-level security enforced at the database, not just the API.
- **Extensibility:** Modular structure so a paid tier (dedicated DB, dedicated backend, paid maps quota) can be swapped in purely via config/env changes.

---

## 5. Recommended Tech Stack ($0 Architecture)

> Design principle: **consolidate services** so we need the fewest possible billed components, and pick providers whose *free tier* (not trial) is generous enough for real early-stage usage. Nothing below is deprecated or unmaintained.

### 5.1 Frontend

| Layer | Choice | Why / Cost |
|---|---|---|
| Framework | **Next.js 15 (App Router) + React 19** | SSR + serverless API routes in one app — removes the need for a separately hosted backend, which removes a billed service entirely |
| Language | **TypeScript** | Type safety end-to-end |
| Styling | **Tailwind CSS v4 + shadcn/ui** | Free, no design-system licensing |
| State (local/UI) | **Zustand** | Lightweight, free |
| Server-state | **TanStack Query v5** | Caching/optimistic updates, free |
| Maps | **MapLibre GL JS** + **OpenStreetMap raster/vector tiles** | Fully open-source, no per-load billing, unlike Google Maps/Mapbox which meter usage |
| Geocoding | **Nominatim (OSM)** for dev/low-volume, with the option to switch to **Mapbox Geocoding free tier (100k req/mo)** if stricter rate limits become a problem | $0 either way at current scale |
| Forms | **React Hook Form + Zod** | Free |

### 5.2 Backend

| Layer | Choice | Why / Cost |
|---|---|---|
| Runtime | **Next.js Route Handlers (serverless functions)** on **Vercel Hobby (free) plan** | No separate backend service to pay for; scales to zero when idle |
| Validation | **Zod**, shared package with frontend | Free |
| Realtime channel | **Supabase Realtime** (WebSocket layer built on Postgres logical replication, included free) | Replaces a self-hosted Socket.IO server — no extra billed process |
| Background/scheduled jobs | **Supabase Edge Functions + `pg_cron`** (free tier includes scheduled functions) | Replaces a dedicated Redis+BullMQ worker, which would otherwise require an always-on paid dyno |

### 5.3 Data Layer & Authentication — **Supabase (Free Tier)**

Supabase is chosen specifically because its free tier bundles **Postgres + Auth + Realtime + Storage** into one product — this is the single biggest lever for hitting $0, since it avoids paying separately for a database host, an auth provider, a WebSocket server, and a file storage bucket.

| Layer | Choice | Why / Cost |
|---|---|---|
| Primary DB | **Supabase Postgres (free tier: 500MB DB, shared CPU)** | Full Postgres, including **PostGIS** extension for checkpoint geo-data, at $0 |
| ORM | **Drizzle ORM** (or Prisma) against the Supabase connection string | Type-safe queries/migrations, free, works with any Postgres |
| Auth | **Supabase Auth** (free tier: unlimited social logins, up to 50,000 monthly active users) | Handles email/password, magic links, and OAuth (Google, etc.) out of the box — no need to build/host our own auth server. Issues standard JWTs we verify in Next.js middleware. |
| Session/cache | **Upstash Redis (free tier: 10,000 commands/day)** | Used only for lightweight rate limiting on public endpoints; not required for auth (Supabase handles that) |
| Object storage | **Supabase Storage (free tier: 1GB)** | Trip cover photos, spot images |
| Row-level security | **Postgres RLS policies** (native to Supabase) | Ownership enforced at the *database* level (a user can only read/write their own trips), not only in application code — this is a real security improvement, not just a cost one |

### 5.4 Infrastructure / DevOps ($0)

| Layer | Choice | Why / Cost |
|---|---|---|
| Frontend + API hosting | **Vercel Hobby plan** | Free for personal/non-commercial projects; generous serverless function invocations included. *(Note: Vercel's free Hobby tier is licensed for personal/non-commercial use — if this becomes a commercial product, the small-team **Pro plan** is the next paid step; flagged here for transparency, not hidden.)* |
| CI/CD | **GitHub Actions** | Free: 2,000 build minutes/month on private repos, unlimited on public repos |
| Error tracking | **Sentry Developer (free) tier** | 5,000 errors/month free |
| Domain | **Vercel's free `*.vercel.app` subdomain**, or a domain the user already owns | Avoids a mandatory domain-registration cost |
| CDN/DDoS | **Cloudflare Free plan** (optional, in front of a custom domain) | Free tier includes basic WAF/rate limiting |

### 5.5 Monorepo Structure

```
travel-planner/
├── app/                # Next.js App Router (pages + route handlers = API)
├── lib/
│   ├── db/             # Drizzle schema + Supabase client
│   ├── auth/           # Supabase Auth helpers, middleware, session utils
│   └── validation/     # Shared Zod schemas
├── components/
├── stores/             # Zustand stores
└── infra/              # Supabase migrations, RLS policies (SQL)
```

A single Next.js app (rather than a separate NestJS service) is the key structural decision that makes $0 hosting realistic — one deployable unit, one free-tier host.

---

## 6. Authentication & User Management

### 6.1 Modes of use

1. **Anonymous mode (default):** On first visit, the app calls `supabase.auth.signInAnonymously()`. Supabase issues a real anonymous user record and a JWT — this is *not* a hand-rolled cookie, it's a proper (if unverified) auth identity. All trips created in this state are owned by that anonymous `user.id`.
2. **Registered mode:** The user can sign up at any time via:
   - Email + password
   - Google OAuth (or GitHub/Apple — configured per business needs)
   - Magic link (passwordless email)

### 6.2 Claiming anonymous trips

Supabase Auth supports **linking an anonymous user to a permanent identity** (`supabase.auth.updateUser()` / identity linking) — the `user.id` stays the same, it's simply upgraded from anonymous to permanent. This means:

- No data migration step is needed.
- Every `trip.owner_id` foreign key remains valid before and after signup.
- The UI simply prompts: *"Save this trip forever — sign up in 10 seconds"* at natural moments (e.g., after adding 2+ checkpoints).

### 6.3 Session handling

- Supabase issues a short-lived **access JWT** + a **refresh token**, stored in httpOnly cookies via the `@supabase/ssr` package (the current, non-deprecated integration for Next.js server components — replaces the old `auth-helpers` package).
- Next.js **middleware** validates/refreshes the session on every request server-side, so protected route handlers never trust a client-supplied user id — they read it from the verified JWT.
- **Row-Level Security policies** in Postgres are the real enforcement layer:

```sql
-- Example RLS policy on the trips table
create policy "Users can manage their own trips"
on trips
for all
using (owner_id = auth.uid());
```

  Even if an API route had a bug, the database itself refuses cross-user access. This is a stronger security posture than relying on API-layer checks alone.

### 6.4 Authorization tiers

| Role | Capability |
|---|---|
| Anonymous | Create/edit own trip(s); trip lost if cookies/local device data are cleared unless a share link was saved |
| Registered user | Trips persist to account; access from any device by logging in |
| Trip collaborator (via share link) | Can view (read-only link) or edit (edit link) a specific trip without needing their own account — token-scoped access, not full auth |

### 6.5 Auth-related tables

```
-- Managed internally by Supabase Auth (not hand-built): auth.users

Profile                          -- our own public-facing extension of auth.users
 ├─ id (uuid, PK, FK -> auth.users.id)
 ├─ display_name
 ├─ avatar_url
 ├─ created_at

TripShareToken
 ├─ id (uuid, PK)
 ├─ trip_id (FK)
 ├─ token (unique, indexed)
 ├─ access_level (view | edit)
 ├─ expires_at (nullable)
```

---

## 7. Data Model (Core Entities)

```
Trip
 ├─ id (uuid, PK)
 ├─ owner_id (uuid, FK -> auth.users.id)   -- works for both anonymous & registered users
 ├─ title
 ├─ start_date, end_date                   -- derived/settable, drives "days"
 ├─ currency
 ├─ created_at, updated_at, expires_at     -- expiry only applies while owner is still anonymous

Companion
 ├─ id (uuid, PK)
 ├─ trip_id (FK)
 ├─ name, color/avatar

Checkpoint
 ├─ id (uuid, PK)
 ├─ trip_id (FK)
 ├─ order_index
 ├─ location (name, lat, lng)              -- PostGIS point
 ├─ arrival_date, departure_date
 ├─ notes (text)

Stay
 ├─ id (uuid, PK)
 ├─ checkpoint_id (FK)
 ├─ name, address, lat/lng
 ├─ cost_per_night, nights

BudgetItem
 ├─ id (uuid, PK)
 ├─ trip_id (FK)
 ├─ checkpoint_id (nullable FK)
 ├─ category (transport | stay | food | activity | other)
 ├─ amount, currency
 ├─ is_auto_generated (bool)

Note
 ├─ id (uuid, PK)
 ├─ trip_id (FK)
 ├─ checkpoint_id (nullable FK)
 ├─ body (text)
```

Budget and duration are **never stored as static numbers** — they're computed from `BudgetItem` rows and `start_date`/`end_date`, avoiding drift between stored totals and actual line items.

---

## 8. Real-Time Budget & Duration Calculation

1. **Client-side (instant, optimistic):** All open-trip data lives in a Zustand store. Any mutation (add checkpoint, change nights, add budget item) updates the store immediately; `totalDays`/`totalBudget` are derived via selectors — instant, zero network latency.
2. **Server-side (source of truth):** The same mutation is sent via a debounced (~300–500ms) TanStack Query mutation to a Next.js route handler, which recomputes authoritative totals in Postgres (never trusts client-sent totals).
3. **Cross-device sync:** If the same trip is open elsewhere, **Supabase Realtime** (Postgres change subscriptions) pushes the update over WebSocket to reconcile the other session — no separately hosted WebSocket server needed, and it's free.

---

## 9. Cost Breakdown — Verifying the $0 Claim

| Service | Free tier limit | Expected usage at launch | Verdict |
|---|---|---|---|
| Vercel Hobby | 100GB bandwidth/mo, generous serverless invocations | Small-to-mid early traffic | $0 (personal/non-commercial license — see note in §5.4) |
| Supabase Free | 500MB DB, 1GB storage, 50k MAU auth, project pauses after 1 week of total inactivity | Fine for MVP/early growth | $0 |
| Upstash Redis Free | 10,000 commands/day | Rate limiting only, low volume | $0 |
| MapLibre + OSM tiles | No usage cap (self-served tiles, open license) | Any volume | $0 |
| GitHub Actions | 2,000 min/mo private, unlimited public | CI/CD pipeline | $0 |
| Sentry Free | 5,000 events/mo | Error tracking | $0 |
| Cloudflare Free | Unlimited (basic tier) | CDN/WAF | $0 |

**Honesty check:** these are real free tiers, not trials — but they have real ceilings (e.g., Supabase's project auto-pause after a week fully idle, 500MB DB cap). The architecture is deliberately chosen so that hitting a ceiling means **upgrading one line item** (e.g., Supabase Pro at $25/mo) rather than re-architecting — cost only appears when actual usage justifies it, never before.

---

## 10. API Surface (representative)

```
POST   /api/trips                       Create trip (uses current auth session, anon or real)
GET    /api/trips/:id                   Fetch full trip (checkpoints, stays, budget, notes)
PATCH  /api/trips/:id                   Update trip meta
POST   /api/trips/:id/companions        Add companion
POST   /api/trips/:id/checkpoints       Add checkpoint
PATCH  /api/trips/:id/checkpoints/:cpId Update checkpoint
DELETE /api/trips/:id/checkpoints/:cpId
POST   /api/trips/:id/budget-items      Add budget line item
GET    /api/trips/:id/summary           Server-computed { totalDays, totalBudget, perPerson }
POST   /api/trips/:id/share             Generate shareable token (view|edit)
POST   /api/auth/link-identity          Upgrade anonymous session to full account
```

Auth (signup/login/OAuth/session refresh) itself is handled by the **Supabase Auth client SDK** directly from the frontend — we don't hand-build those endpoints.

---

## 11. Roadmap / Future Improvements

| Phase | Feature | Technical implication |
|---|---|---|
| v1.1 | Multi-editor collaboration on same trip | CRDT (Yjs) layer on top of existing Supabase Realtime channel |
| v1.2 | AI itinerary suggestions | Serverless function calling an LLM API, reading trip context |
| v1.3 | Booking integrations (stays/flights) | Provider adapters behind a `BookingProvider` interface |
| v1.4 | Public trip pages / SEO | Next.js ISR for shareable public itineraries |
| v1.5 | Scale past free tier | Upgrade Supabase plan, move Vercel to Pro/Team — additive, not a rewrite |
| v2 | Native mobile app | Reuse Supabase client libraries (available for mobile) + existing REST surface |

---

## 12. Why These Choices Over Alternatives

- **Not a separate NestJS backend:** would require its own always-on host to avoid cold starts at scale, which starts costing money; Next.js route handlers on Vercel scale to zero for free.
- **Not Firebase:** Firestore's free tier is real but its pricing cliff on reads/writes is steep and NoSQL doesn't fit this relational trip→checkpoint→budget model well; Supabase gives relational Postgres *and* auth for free instead.
- **Not Auth0/Clerk for auth:** both have real free tiers, but adding either means a *second* service alongside the database; Supabase Auth is already bundled with the database we're using, keeping the service count minimal.
- **Not Google Maps/Mapbox as the only option:** both meter usage and can generate a bill under viral growth; MapLibre + OpenStreetMap has no such ceiling, which matters specifically because "$0" is a hard requirement here, not just a preference.
- **Not a dedicated Redis-backed BullMQ worker:** an always-on worker process is exactly the kind of thing that isn't free on any host; Supabase's scheduled Edge Functions cover the same need without a persistent billed process.

---

## 13. Summary

TripCraft runs as a **single Next.js application** (frontend + serverless API) on **Vercel's free tier**, backed by **Supabase's free tier** for Postgres, Authentication, Realtime, and Storage — deliberately consolidating what would normally be four separate billed services into one. Authentication supports **anonymous-by-default, upgradeable-to-real-account** access, with **Postgres Row-Level Security** as the actual enforcement layer rather than just application code. Budget and trip-duration figures are computed **client-side for instant feedback** and reconciled against a **server-computed source of truth**, synced across devices via Supabase Realtime. Every component was chosen so the system runs at genuine $0 cost today, while every upgrade path (paid Supabase tier, Vercel Pro, dedicated maps quota) is a config change, not a rewrite.
