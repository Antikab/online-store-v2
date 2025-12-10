import { type App } from 'vue'
import InlineSvg from 'vue-inline-svg'

function setupInlineSvg(app: App) {
  app.component('InlineSvg', InlineSvg)
}

export { setupInlineSvg }
