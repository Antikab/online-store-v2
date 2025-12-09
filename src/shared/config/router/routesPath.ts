const routesPath = {
  home: '/',
  register: '/register',
  login: '/login',
  updatePassword: '/update-password',
  resetPassword: '/reset-password',
} as const

type RoutePath = (typeof routesPath)[keyof typeof routesPath]

export { routesPath, type RoutePath }
