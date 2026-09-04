-- Gridly CRM lead capture — run in the Supabase SQL editor.

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

-- RLS is enabled so the anon/public key can never read or write leads directly.
-- server.js talks to Supabase with the service_role key, which bypasses RLS,
-- so no additional policy is required for the backend to function.
alter table public.leads enable row level security;

-- Price-calculator pricing, editable from /admin.html. A single row
-- (id = 'default') holds every price the estimator on the public site uses.
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

insert into public.pricing_config (id)
values ('default')
on conflict (id) do nothing;

alter table public.pricing_config enable row level security;
