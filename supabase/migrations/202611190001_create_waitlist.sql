create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  interest text not null default 'Everything',
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_format check (email = lower(trim(email)) and position('@' in email) > 1)
);

create unique index if not exists waitlist_signups_email_unique on public.waitlist_signups (email);
create index if not exists waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;
revoke all on table public.waitlist_signups from anon, authenticated;
grant insert (email, name, interest) on table public.waitlist_signups to anon, authenticated;

drop policy if exists "Anyone can join the waitlist" on public.waitlist_signups;
create policy "Anyone can join the waitlist"
  on public.waitlist_signups
  for insert to anon, authenticated
  with check (
    email = lower(trim(email))
    and position('@' in email) > 1
    and char_length(email) <= 320
    and (name is null or char_length(name) <= 80)
    and interest in ('Everything','Movies & entertainment','Music & podcasts','Zimflix Study','Creator tools','Zimflix Market')
  );

comment on table public.waitlist_signups is 'Zimflix pre-launch waitlist. Private contact data; admin/service role only for reading.';
