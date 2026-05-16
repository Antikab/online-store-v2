import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    headerVariant?: 'shop' | 'auth' | 'default'
    footer?: boolean
    activeIcon?: 'wishlist' | 'account' | 'cart'
  }
}
