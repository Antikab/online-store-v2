const routesName = {
  home: 'home',
  catalogMen: 'catalogMen',
  catalogWomen: 'catalogWomen',
  productDetail: 'productDetail',
  cart: 'cart',
  checkout: 'checkout',
  orderConfirmed: 'orderConfirmed',
  accountOrders: 'accountOrders',
  wishlist: 'wishlist',
  register: 'register',
  login: 'login',
  updatePassword: 'updatePassword',
  resetPassword: 'resetPassword',
  notFound: 'notFound',
} as const

type RouteName = (typeof routesName)[keyof typeof routesName]

export { routesName, type RouteName }
