-- TripCraft initial schema migration
-- Run via Supabase SQL editor or `supabase db push`

-- Extensions
create extension if not exists "uuid-ossp";

-- Enums
create type budget_category as enum ('transport', 'stay', 'food', 'activity', 'other');
create type share_access_level as enum ('view', 'edit');

-- Profiles (extends auth.users)
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Trips
create table trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  title text not null default 'Untitled Trip',
  start_date timestamptz,
  end_date timestamptz,
  currency text not null default 'USD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz
);

create index trips_owner_id_idx on trips (owner_id);

-- Companions
create table companions (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips (id) on delete cascade,
  name text not null,
  color text,
  avatar_url text
);

create index companions_trip_id_idx on companions (trip_id);

-- Checkpoints
create table checkpoints (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips (id) on delete cascade,
  order_index integer not null default 0,
  location_name text not null,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  arrival_date timestamptz,
  departure_date timestamptz,
  notes text
);

create index checkpoints_trip_id_idx on checkpoints (trip_id);

-- Stays
create table stays (
  id uuid primary key default gen_random_uuid(),
  checkpoint_id uuid not null references checkpoints (id) on delete cascade,
  name text not null,
  address text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  cost_per_night numeric(12, 2),
  nights integer not null default 1
);

create index stays_checkpoint_id_idx on stays (checkpoint_id);

-- Budget items
create table budget_items (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips (id) on delete cascade,
  checkpoint_id uuid references checkpoints (id) on delete set null,
  category budget_category not null default 'other',
  amount numeric(12, 2) not null,
  currency text not null default 'USD',
  is_auto_generated boolean not null default false
);

create index budget_items_trip_id_idx on budget_items (trip_id);

-- Notes
create table notes (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips (id) on delete cascade,
  checkpoint_id uuid references checkpoints (id) on delete cascade,
  body text not null
);

create index notes_trip_id_idx on notes (trip_id);

-- Share tokens
create table trip_share_tokens (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips (id) on delete cascade,
  token text not null unique,
  access_level share_access_level not null default 'view',
  expires_at timestamptz
);

create index trip_share_tokens_token_idx on trip_share_tokens (token);
create index trip_share_tokens_trip_id_idx on trip_share_tokens (trip_id);
