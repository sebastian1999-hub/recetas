-- Esquema para "Recetas de la yaya"
-- Ejecutar en el SQL Editor de Supabase (proyecto compartido con Wordle)

create extension if not exists "pgcrypto";

create table if not exists recetas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text default '',
  foto_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists receta_ingredientes (
  id uuid primary key default gen_random_uuid(),
  receta_id uuid not null references recetas(id) on delete cascade,
  nombre text not null,
  icono text not null default '🥘',
  cantidad_gramos numeric not null default 0,
  orden integer not null default 0
);

create index if not exists receta_ingredientes_receta_id_idx on receta_ingredientes (receta_id);

alter table recetas enable row level security;
alter table receta_ingredientes enable row level security;

-- Acceso público de lectura/escritura (app sin login, uso personal/familiar).
-- Si en el futuro añades autenticación, sustituye estas políticas por reglas basadas en auth.uid().
drop policy if exists "recetas_publico" on recetas;
create policy "recetas_publico" on recetas for all using (true) with check (true);

drop policy if exists "receta_ingredientes_publico" on receta_ingredientes;
create policy "receta_ingredientes_publico" on receta_ingredientes for all using (true) with check (true);
