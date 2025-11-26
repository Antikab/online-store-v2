// app/router/routes.ts
import { HomePage } from '@pages/home'

export const routes = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/register',
    name: 'register',
    component: () => import('@pages/auth/ui/RegisterPage.vue'),
  },
]
