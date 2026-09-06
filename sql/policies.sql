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
  dual_language integer not null default 150,
  feature_animations integer not null default 150,
  feature_calculator integer not null default 200,
  feature_cms integer not null default 350,
  feature_domain integer not null default 50,
  feature_email integer not null default 30,
  feature_seo integer not null default 500,
  express_delivery_landing integer not null default 200,
  express_delivery_multi integer not null default 320,
  price_per_page integer not null default 100,
  updated_at timestamptz not null default now()
);
-- Adds the two newest priced add-ons (domain, SEO) to a pricing_config table
-- created before they existed; a no-op on a fresh install.
alter table public.pricing_config add column if not exists feature_domain integer not null default 50;
alter table public.pricing_config add column if not exists feature_seo integer not null default 500;
-- Splits the single flat express-delivery surcharge into two, since a
-- multi-page site takes meaningfully more work to rush than a one-pager;
-- a no-op on a fresh install, and harmless to re-run on an install that
-- already has these columns.
alter table public.pricing_config add column if not exists express_delivery_landing integer not null default 200;
alter table public.pricing_config add column if not exists express_delivery_multi integer not null default 320;
alter table public.pricing_config drop column if exists express_delivery;
-- Per-extra-page surcharge for multi-page sites, charged for each page beyond
-- the two the base package already covers; a no-op on a fresh install.
alter table public.pricing_config add column if not exists price_per_page integer not null default 100;
-- Business email as a priced add-on; a no-op on a fresh install.
alter table public.pricing_config add column if not exists feature_email integer not null default 30;
-- Multi-page is now free on its own (only extra pages beyond the included
-- two are charged, via price_per_page above); drop its old flat surcharge.
alter table public.pricing_config drop column if exists multi_page;
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

create table if not exists public.site_config (
  id text primary key default 'default',
  maintenance_mode boolean not null default false,
  updated_at timestamptz not null default now()
);
insert into public.site_config (id) values ('default') on conflict (id) do nothing;
alter table public.site_config enable row level security;

-- site_config: readable by everyone (the public site needs it with no
-- login to know whether to show the maintenance page), writable only by
-- a signed-in admin.
drop policy if exists "Anyone can read site config" on public.site_config;
create policy "Anyone can read site config" on public.site_config
  for select to anon, authenticated using (true);

drop policy if exists "Admins can update site config" on public.site_config;
create policy "Admins can update site config" on public.site_config
  for update to authenticated using (true) with check (true);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  client_ref text,
  contact_number text,
  service text not null,
  price numeric not null default 0,
  subscribed_on date not null,
  notes text,
  created_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;

-- subscriptions: internal billing records — admins only, no public access.
drop policy if exists "Admins can view subscriptions" on public.subscriptions;
create policy "Admins can view subscriptions" on public.subscriptions
  for select to authenticated using (true);

drop policy if exists "Admins can insert subscriptions" on public.subscriptions;
create policy "Admins can insert subscriptions" on public.subscriptions
  for insert to authenticated with check (true);

drop policy if exists "Admins can update subscriptions" on public.subscriptions;
create policy "Admins can update subscriptions" on public.subscriptions
  for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete subscriptions" on public.subscriptions;
create policy "Admins can delete subscriptions" on public.subscriptions
  for delete to authenticated using (true);
