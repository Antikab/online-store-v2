-- Executed manually in the Supabase SQL Editor on 2026-10-29.
-- Record this version as applied on that project; do not execute it there again.
-- Other environments must still have an empty wishlist before this migration.
begin;

lock table public.wishlists in access exclusive mode;

do $$
begin
  if exists (select 1 from public.wishlists) then
    raise exception
      'Wishlist is not empty. Existing items must be migrated first.';
  end if;
end;
$$;

alter table public.wishlists
  add column product_id uuid not null;

alter table public.wishlists
  add constraint wishlists_product_id_fkey
  foreign key (product_id)
  references public.products (id)
  on update cascade
  on delete cascade;

alter table public.wishlists
  add constraint wishlists_user_product_unique
  unique (user_id, product_id);

alter table public.wishlists
  drop column product_variant_id,
  drop column quantity;

commit;
