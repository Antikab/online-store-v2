import 'vue-router'
import type { HeaderActiveIcon, HeaderVariant } from '@shared/config/router/routeMeta.types'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    headerVariant?: HeaderVariant
    footer?: boolean
    activeIcon?: HeaderActiveIcon
  }
}
