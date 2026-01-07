import { createApp } from 'vue'

import App from '@app/entrypoint/App.vue'
import '@app/styles/main.css'

import { setupSupabaseAuth, setupPinia, setupRouter, setupInlineSvg } from '@app/providers'

const bootstrap = async () => {
  const app = createApp(App)

  app.use(setupPinia)

  await setupSupabaseAuth()

  app.use(setupRouter)

  setupInlineSvg(app)
  app.mount('#app')
}

bootstrap()
