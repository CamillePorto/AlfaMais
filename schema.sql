-- ============================================================
--  ALFA+ · Schema do Supabase
--  Cole este SQL em: Supabase → SQL Editor → New Query → Run
-- ============================================================

-- 1. PERFIS (extensão da tabela auth.users do Supabase)
create table public.perfis (
  id          uuid references auth.users on delete cascade primary key,
  nome        text not null,
  apelido     text,
  cidade      text,
  idade       int,
  avatar_url  text,
  papel       text not null default 'aluno',   -- 'aluno' | 'instrutor'
  turma       text,
  criado_em   timestamptz default now()
);

-- Permite que cada usuário leia/edite só o próprio perfil
alter table public.perfis enable row level security;

create policy "Usuário vê próprio perfil"
  on public.perfis for select
  using (auth.uid() = id);

create policy "Usuário edita próprio perfil"
  on public.perfis for update
  using (auth.uid() = id);

create policy "Instrutor vê todos os perfis"
  on public.perfis for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid() and p.papel = 'instrutor'
    )
  );

-- Inserção pública para cadastro inicial
create policy "Inserção pública"
  on public.perfis for insert
  with check (auth.uid() = id);


-- 2. PROGRESSO
create table public.progresso (
  id            bigserial primary key,
  user_id       uuid references auth.users on delete cascade,
  modulo        text not null,    -- ex: 'letras', 'silabas', 'jogo'
  licao         text not null,    -- ex: 'A', 'B', 'jogo-facil'
  acertos       int default 0,
  total         int default 0,
  pct           int default 0,
  atualizado_em timestamptz default now(),
  unique (user_id, modulo, licao)
);

alter table public.progresso enable row level security;

create policy "Aluno vê próprio progresso"
  on public.progresso for all
  using (auth.uid() = user_id);

create policy "Instrutor vê todo progresso"
  on public.progresso for select
  using (
    exists (
      select 1 from public.perfis p
      where p.id = auth.uid() and p.papel = 'instrutor'
    )
  );


-- 3. FUNÇÃO: criar perfil automaticamente após cadastro
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.perfis (id, nome, papel)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', 'Aluno'),
    coalesce(new.raw_user_meta_data->>'papel', 'aluno')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 4. SEED: criar um instrutor de exemplo
--    (Troque o email e senha antes de rodar, ou crie via painel do Supabase)
-- insert into auth.users ... (use o painel: Authentication → Add user)
-- Depois defina o papel manualmente:
-- update public.perfis set papel = 'instrutor', nome = 'Professora Ana' where id = '<uuid>';
