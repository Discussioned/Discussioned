-- Discussioned production foundation
create extension if not exists pgcrypto;

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  topic_type text not null default 'topic',
  category text not null default 'ideas',
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.discussions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  prompt text not null,
  body text,
  source_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.contributions (
  id uuid primary key default gen_random_uuid(),
  discussion_id uuid not null references public.discussions(id) on delete cascade,
  parent_id uuid references public.contributions(id) on delete cascade,
  anonymous_owner_id uuid not null default gen_random_uuid(),
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid references public.contributions(id) on delete cascade,
  discussion_id uuid references public.discussions(id) on delete cascade,
  anonymous_owner_id uuid not null,
  reaction_type text not null check (reaction_type in ('helpful','interesting','needs_source','agree','disagree')),
  created_at timestamptz not null default now(),
  unique(contribution_id, anonymous_owner_id, reaction_type)
);

create table if not exists public.connection_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null,
  recipient_id uuid not null,
  contribution_id uuid references public.contributions(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','accepted','declined','blocked')),
  created_at timestamptz not null default now(),
  unique(requester_id, recipient_id)
);

alter table public.topics enable row level security;
alter table public.discussions enable row level security;
alter table public.contributions enable row level security;
alter table public.reactions enable row level security;
alter table public.connection_requests enable row level security;

create policy "Public topics are readable" on public.topics for select using (true);
create policy "Public discussions are readable" on public.discussions for select using (true);
create policy "Public contributions are readable" on public.contributions for select using (true);
create policy "Anyone may create topics" on public.topics for insert with check (true);
create policy "Anyone may create discussions" on public.discussions for insert with check (true);
create policy "Anyone may contribute" on public.contributions for insert with check (true);
create policy "Anyone may react" on public.reactions for insert with check (true);

-- Connection requests and future private messages should be tied to Supabase Auth
-- before production launch. Do not create broad public select policies for them.
