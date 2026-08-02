create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  stack text[] not null default '{}',
  github_url text,
  live_url text,
  repository_note text,
  status text not null check (status in ('completed', 'in_progress', 'private')),
  featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  alt text not null,
  sort_order integer not null default 0
);

create index if not exists projects_featured_created_at_idx on projects (featured desc, created_at desc);
create index if not exists project_images_project_id_idx on project_images (project_id);
