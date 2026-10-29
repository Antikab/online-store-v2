-- Wishlist stores a concrete product variant (product + color + size).
-- Quantity is the desired quantity the customer can later move to the cart.
alter table public.wishlists
  add column quantity integer not null default 1,
  add constraint wishlists_quantity_positive check (quantity > 0);

create policy "Users can update their own wishlist items"
on public.wishlists
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

comment on column public.wishlists.quantity is
  'Desired quantity for this exact product variant; must be positive.';

-- Supabase Data API access is controlled by both table privileges and RLS.
-- Keep only the operations that the browser application actually needs.
revoke all privileges on all tables in schema public from anon, authenticated;

grant select on table
  public.categories,
  public.colors,
  public.product_images,
  public.product_specs,
  public.product_variants,
  public.product_videos,
  public.products,
  public.sizes
to anon, authenticated;

-- Coupon codes are currently resolved by the client. Replace this grant with
-- a code-validation RPC when the checkout flow is implemented so active codes
-- cannot be enumerated through the Data API.
grant select on table public.coupons to anon, authenticated;

grant select, update on table public.auth_users to authenticated;
grant select, insert, update, delete on table public.carts to authenticated;
grant select, insert, update, delete on table public.cart_items to authenticated;
grant select, insert, update, delete on table public.wishlists to authenticated;

-- Direct order inserts are kept temporarily for compatibility. The checkout
-- migration must replace them with EXECUTE on one atomic create-order RPC.
grant select, insert on table public.orders to authenticated;
grant select, insert on table public.order_items to authenticated;

-- Trigger functions are not public APIs and must not be callable directly.
revoke execute on function public.set_product_variant_sku()
from public, anon, authenticated;

-- New database objects should be exposed deliberately in future migrations.
alter default privileges for role postgres in schema public
  revoke all on tables from anon, authenticated;

alter default privileges for role postgres in schema public
  revoke execute on functions from public;
