import { HomePage } from '@pages/home'
import { routesName, routesPath } from '@shared/config'

const routesConfig = [
  { path: routesPath.home, name: routesName.home, component: HomePage },
  {
    path: routesPath.register,
    name: routesName.register,
    component: () => import('@pages/auth/ui/RegisterPage.vue'),
  },
  {
    path: routesPath.login,
    name: routesName.login,
    component: () => import('@pages/auth/ui/LoginPage.vue'),
  },
  {
    path: routesPath.updatePassword,
    name: routesName.updatePassword,
    component: () => import('@/pages/auth/ui/UpdatePasswordPage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: routesPath.resetPassword,
    name: routesName.resetPassword,
    component: () => import('@/pages/auth/ui/ResetPasswordPage.vue'),
  },
]

export { routesConfig }
