-- Row-Level Security policies for TripCraft
-- Enable RLS on all user-owned tables

alter table profiles enable row level security;
alter table trips enable row level security;
alter table companions enable row level security;
alter table checkpoints enable row level security;
alter table stays enable row level security;
alter table budget_items enable row level security;
alter table notes enable row level security;
alter table trip_share_tokens enable row level security;

-- Profiles
create policy "Users can view their own profile"
  on profiles for select
  using (id = auth.uid());

create policy "Users can update their own profile"
  on profiles for update
  using (id = auth.uid());

create policy "Users can insert their own profile"
  on profiles for insert
  with check (id = auth.uid());

-- Trips
create policy "Users can manage their own trips"
  on trips for all
  using (owner_id = auth.uid());

-- Companions (via trip ownership)
create policy "Users can manage companions on their trips"
  on companions for all
  using (
    trip_id in (select id from trips where owner_id = auth.uid())
  );

-- Checkpoints
create policy "Users can manage checkpoints on their trips"
  on checkpoints for all
  using (
    trip_id in (select id from trips where owner_id = auth.uid())
  );

-- Stays
create policy "Users can manage stays on their checkpoints"
  on stays for all
  using (
    checkpoint_id in (
      select c.id from checkpoints c
      join trips t on t.id = c.trip_id
      where t.owner_id = auth.uid()
    )
  );

-- Budget items
create policy "Users can manage budget items on their trips"
  on budget_items for all
  using (
    trip_id in (select id from trips where owner_id = auth.uid())
  );

-- Notes
create policy "Users can manage notes on their trips"
  on notes for all
  using (
    trip_id in (select id from trips where owner_id = auth.uid())
  );

-- Share tokens
create policy "Trip owners can manage share tokens"
  on trip_share_tokens for all
  using (
    trip_id in (select id from trips where owner_id = auth.uid())
  );
