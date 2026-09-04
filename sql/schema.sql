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
