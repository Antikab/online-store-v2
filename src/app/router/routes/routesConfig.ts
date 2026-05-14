import { HomePage } from '@pages/home'
import { routesName, routesPath } from '@shared/config'

const routesConfig = [
  { path: routesPath.home, name: routesName.home, component: HomePage },
  {
    path: routesPath.catalogMen,
    name: routesName.catalogMen,
    component: () => import('@pages/catalog').then(({ CatalogPage }) => CatalogPage),
    props: { gender: 'men' },
  },
  {
    path: routesPath.catalogWomen,
    name: routesName.catalogWomen,
    component: () => import('@pages/catalog').then(({ CatalogPage }) => CatalogPage),
    props: { gender: 'women' },
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
  },
  {
    path: routesPath.checkout,
    name: routesName.checkout,
    component: () => import('@pages/checkout').then(({ CheckoutPage }) => CheckoutPage),
    meta: { requiresAuth: true },
  },
  {
    path: routesPath.orderConfirmed,
    name: routesName.orderConfirmed,
    component: () =>
      import('@pages/order-confirmed').then(({ OrderConfirmedPage }) => OrderConfirmedPage),
    meta: { requiresAuth: true },
  },
  {
    path: routesPath.accountOrders,
    name: routesName.accountOrders,
    component: () => import('@pages/account').then(({ OrdersPage }) => OrdersPage),
    meta: { requiresAuth: true },
  },
  {
    path: routesPath.wishlist,
    name: routesName.wishlist,
    component: () => import('@pages/wishlist').then(({ WishlistPage }) => WishlistPage),
  },
  {
    path: routesPath.register,
    name: routesName.register,
    component: () => import('@pages/auth').then(({ RegisterPage }) => RegisterPage),
  },
  {
    path: routesPath.login,
    name: routesName.login,
    component: () => import('@pages/auth').then(({ LoginPage }) => LoginPage),
  },
  {
    path: routesPath.updatePassword,
    name: routesName.updatePassword,
    component: () => import('@pages/auth').then(({ UpdatePasswordPage }) => UpdatePasswordPage),
    meta: { requiresAuth: true },
  },
  {
    path: routesPath.resetPassword,
    name: routesName.resetPassword,
    component: () => import('@pages/auth').then(({ ResetPasswordPage }) => ResetPasswordPage),
  },
  {
    path: routesPath.notFound,
    name: routesName.notFound,
    component: () => import('@pages/not-found').then(({ NotFoundPage }) => NotFoundPage),
  },
]

export { routesConfig }
