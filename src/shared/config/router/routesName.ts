const routesName = {
  home: 'home',
  register: 'register',
  login: 'login',
  updatePassword: 'updatePassword',
  resetPassword: 'resetPassword',
} as const

type RouteName = (typeof routesName)[keyof typeof routesName]

export { routesName, type RouteName }
