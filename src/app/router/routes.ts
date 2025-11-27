// src/app/router/routes.ts
import { HomePage } from '@pages/home'
import { routesName } from './routesName'

const routes = [
  { path: '/', name: routesName.home, component: HomePage },
  {
    path: '/register',
    name: routesName.register,
    component: () => import('@pages/auth/ui/RegisterPage.vue'),
  },
  {
    path: '/login',
    name: routesName.login,
    component: () => import('@pages/auth/ui/LoginPage.vue'),
  },
]

export { routes }
