const routesPath = {
  home: '/',
  catalogMen: '/catalog/men',
  catalogWomen: '/catalog/women',
  productDetail: '/product/:slug',
  cart: '/cart',
  checkout: '/checkout',
  orderConfirmed: '/order-confirmed',
  accountOrders: '/account/orders',
  wishlist: '/wishlist',
  register: '/register',
  login: '/login',
  updatePassword: '/update-password',
  resetPassword: '/reset-password',
  notFound: '/:pathMatch(.*)*',
} as const

type RoutePath = (typeof routesPath)[keyof typeof routesPath]

export { routesPath, type RoutePath }
