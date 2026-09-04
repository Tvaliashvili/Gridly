-- Gridly — Supabase setup for a fully static site (no backend server).
-- The site talks to Supabase directly from the browser using the public
-- anon key; these Row Level Security policies are what actually enforce
-- who can do what. Safe to re-run — each policy is dropped and recreated.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  business_type text,
  message text,
  selected_package text,
  calculated_price text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;

create table if not exists public.pricing_config (
  id text primary key default 'default',
  base_price integer not null default 350,
  multi_page integer not null default 250,
  dual_language integer not null default 150,
  feature_animations integer not null default 150,
  feature_calculator integer not null default 200,
  feature_cms integer not null default 350,
  express_delivery integer not null default 200,
  updated_at timestamptz not null default now()
);
insert into public.pricing_config (id) values ('default') on conflict (id) do nothing;
alter table public.pricing_config enable row level security;

-- leads: any visitor (anon) can submit one; only a signed-in admin account
-- (created in Authentication -> Users, not through any public form) can
-- read, update, or delete them.
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead" on public.leads
  for insert to anon, authenticated with check (true);

drop policy if exists "Admins can view leads" on public.leads;
create policy "Admins can view leads" on public.leads
  for select to authenticated using (true);

drop policy if exists "Admins can update leads" on public.leads;
create policy "Admins can update leads" on public.leads
  for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete leads" on public.leads;
create policy "Admins can delete leads" on public.leads
  for delete to authenticated using (true);

-- pricing_config: readable by everyone (the public calculator needs it
-- with no login), writable only by a signed-in admin.
drop policy if exists "Anyone can read pricing" on public.pricing_config;
create policy "Anyone can read pricing" on public.pricing_config
  for select to anon, authenticated using (true);

drop policy if exists "Admins can update pricing" on public.pricing_config;
create policy "Admins can update pricing" on public.pricing_config
  for update to authenticated using (true) with check (true);
