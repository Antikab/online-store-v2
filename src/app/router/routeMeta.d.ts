import 'vue-router'
import type { HeaderActiveIcon, HeaderVariant } from '@shared/config'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    headerVariant?: HeaderVariant
    footer?: boolean
    activeIcon?: HeaderActiveIcon
  }
}
