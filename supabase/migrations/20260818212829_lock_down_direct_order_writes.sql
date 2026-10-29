-- Prices, discounts, shipping and stock must never be trusted from the browser.
-- Orders will be created only through a transactional RPC in a later migration.
drop policy "insert for order_items" on public.order_items;
drop policy "insert for orders" on public.orders;

revoke insert on table public.order_items from authenticated;
revoke insert on table public.orders from authenticated;
