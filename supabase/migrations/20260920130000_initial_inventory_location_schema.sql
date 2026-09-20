-- inventor-web initial schema
-- 창고/매장 공간 사진 위 좌표 기반 재고 위치 조사 MVP

create extension if not exists pgcrypto;

create table if not exists staff_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default 'staff',
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text default 'storage',
  description text,
  sort_order integer default 0,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists space_photos (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references spaces(id) on delete cascade,
  image_url text not null,
  image_path text,
  title text,
  width integer,
  height integer,
  is_primary boolean default false,
  created_by uuid references staff_members(id),
  created_at timestamptz default now()
);

create table if not exists location_points (
  id uuid primary key default gen_random_uuid(),
  space_id uuid not null references spaces(id) on delete cascade,
  space_photo_id uuid not null references space_photos(id) on delete cascade,
  label text not null,
  x_percent numeric(6,3) not null,
  y_percent numeric(6,3) not null,
  point_type text default 'inventory',
  memo text,
  status text default 'active',
  created_by uuid references staff_members(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint location_points_x_percent_check check (x_percent >= 0 and x_percent <= 100),
  constraint location_points_y_percent_check check (y_percent >= 0 and y_percent <= 100)
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  item_code text unique,
  space_id uuid references spaces(id) on delete set null,
  location_point_id uuid references location_points(id) on delete set null,
  name text not null,
  category text,
  brand text,
  size text,
  color text,
  quantity integer default 1,
  condition text,
  status text default 'unconfirmed',
  purchase_price integer,
  sale_price integer,
  assigned_to uuid references staff_members(id),
  memo text,
  discovered_at timestamptz default now(),
  created_by uuid references staff_members(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  sold_at timestamptz
);

create table if not exists item_photos (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid not null references inventory_items(id) on delete cascade,
  image_url text not null,
  image_path text,
  photo_type text default 'reference',
  sort_order integer default 0,
  created_by uuid references staff_members(id),
  created_at timestamptz default now()
);

create table if not exists inventory_activity_logs (
  id uuid primary key default gen_random_uuid(),
  inventory_item_id uuid references inventory_items(id) on delete cascade,
  location_point_id uuid references location_points(id) on delete set null,
  space_id uuid references spaces(id) on delete set null,
  action text not null,
  before_value jsonb,
  after_value jsonb,
  memo text,
  created_by uuid references staff_members(id),
  created_at timestamptz default now()
);

create index if not exists idx_space_photos_space_id on space_photos(space_id);
create index if not exists idx_location_points_space_id on location_points(space_id);
create index if not exists idx_location_points_space_photo_id on location_points(space_photo_id);
create index if not exists idx_inventory_items_space_id on inventory_items(space_id);
create index if not exists idx_inventory_items_location_point_id on inventory_items(location_point_id);
create index if not exists idx_inventory_items_status on inventory_items(status);
create index if not exists idx_inventory_items_category on inventory_items(category);
create index if not exists idx_inventory_items_assigned_to on inventory_items(assigned_to);
create index if not exists idx_inventory_items_name_search
  on inventory_items using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(brand, '') || ' ' || coalesce(memo, '')));

-- Supabase Storage buckets. 실행 권한이 없으면 Supabase Dashboard > Storage에서 직접 생성하세요.
insert into storage.buckets (id, name, public)
values ('space-photos', 'space-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('item-photos', 'item-photos', true)
on conflict (id) do nothing;

-- 샘플 직원/공간 데이터
insert into staff_members (name, role)
values
  ('사장님', 'owner'),
  ('민지', 'staff'),
  ('현우', 'staff')
on conflict do nothing;

insert into spaces (name, type, description, sort_order)
values
  ('창고 A', 'storage', '주요 재고 보관 창고', 1),
  ('백룸', 'backroom', '매장 뒤쪽 임시 보관 공간', 2),
  ('매장 행거존', 'store', '판매 중 상품 진열 공간', 3)
on conflict do nothing;
