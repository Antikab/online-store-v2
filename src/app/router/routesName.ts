const routesName = {
  home: 'home',
  register: 'register',
  login: 'login',
  createPassword: 'createPassword',
} as const

type RouteName = (typeof routesName)[keyof typeof routesName]

export { routesName, type RouteName }
