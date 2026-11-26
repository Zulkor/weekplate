create table if not exists kitchens (
  code       text primary key,
  state      text not null,
  updated_at timestamptz not null default now()
);
