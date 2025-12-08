import { HomePage } from '@pages/home'
import { routesName } from './routesName'

const routes  = [
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
  {
    path: '/create-password',
    name: routesName.createPassword,
    component: () => import('@/pages/auth/ui/CreatePasswordPage.vue'),
    meta: { requiresAuth: true },
  },
]

export { routes  }
