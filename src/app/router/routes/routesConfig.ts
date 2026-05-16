import { type RouteRecordRaw } from 'vue-router'

import { HomePage } from '@pages/home'
import { routesName, routesPath } from '@shared/config'

const routesConfig: RouteRecordRaw[] = [
  {
    path: routesPath.home,
    name: routesName.home,
    component: HomePage,
    meta: { headerVariant: 'shop' },
  },
  {
    path: routesPath.catalog,
    name: routesName.catalog,
    component: () => import('@pages/catalog').then(({ CatalogPage }) => CatalogPage),
    meta: { headerVariant: 'shop' },
  },
  {
    path: routesPath.catalogMen,
    name: routesName.catalogMen,
    component: () => import('@pages/catalog').then(({ CatalogPage }) => CatalogPage),
    props: { gender: 'men' },
    meta: { headerVariant: 'shop' },
  },
  {
    path: routesPath.catalogWomen,
    name: routesName.catalogWomen,
    component: () => import('@pages/catalog').then(({ CatalogPage }) => CatalogPage),
    props: { gender: 'women' },
    meta: { headerVariant: 'shop' },
  },
  {
    path: routesPath.productDetail,
    name: routesName.productDetail,
    component: () => import('@pages/product').then(({ ProductDetailPage }) => ProductDetailPage),
  },
  {
    path: routesPath.cart,
    name: routesName.cart,
    component: () => import('@pages/cart').then(({ CartPage }) => CartPage),
    meta: { activeIcon: 'cart' },
  },
  {
    path: routesPath.checkout,
    name: routesName.checkout,
    component: () => import('@pages/checkout').then(({ CheckoutPage }) => CheckoutPage),
    meta: { requiresAuth: true, activeIcon: 'cart' },
  },
  {
    path: routesPath.orderConfirmed,
    name: routesName.orderConfirmed,
    component: () =>
      import('@pages/order-confirmed').then(({ OrderConfirmedPage }) => OrderConfirmedPage),
    meta: { requiresAuth: true, activeIcon: 'cart' },
  },
  {
    path: routesPath.accountOrders,
    name: routesName.accountOrders,
    component: () => import('@pages/account').then(({ OrdersPage }) => OrdersPage),
    meta: { requiresAuth: true, activeIcon: 'account' },
  },
  {
    path: routesPath.wishlist,
    name: routesName.wishlist,
    component: () => import('@pages/wishlist').then(({ WishlistPage }) => WishlistPage),
    meta: { activeIcon: 'wishlist' },
  },
  {
    path: routesPath.register,
    name: routesName.register,
    component: () => import('@pages/auth').then(({ RegisterPage }) => RegisterPage),
    meta: { headerVariant: 'auth', footer: false },
  },
  {
    path: routesPath.login,
    name: routesName.login,
    component: () => import('@pages/auth').then(({ LoginPage }) => LoginPage),
    meta: { headerVariant: 'auth', footer: false },
  },
  {
    path: routesPath.updatePassword,
    name: routesName.updatePassword,
    component: () => import('@pages/auth').then(({ UpdatePasswordPage }) => UpdatePasswordPage),
    meta: { requiresAuth: true, headerVariant: 'auth', footer: false },
  },
  {
    path: routesPath.resetPassword,
    name: routesName.resetPassword,
    component: () => import('@pages/auth').then(({ ResetPasswordPage }) => ResetPasswordPage),
    meta: { headerVariant: 'auth', footer: false },
  },
  {
    path: routesPath.notFound,
    name: routesName.notFound,
    component: () => import('@pages/not-found').then(({ NotFoundPage }) => NotFoundPage),
  },
]

export { routesConfig }
