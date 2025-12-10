import { createApp } from 'vue'

import App from '@app/entrypoint/App.vue'
import '@app/styles/main.css'

import { setupSupabaseAuthListener, setupPinia, setupRouter, setupInlineSvg } from '@app/providers'

const app = createApp(App)

app.use(setupPinia)
app.use(setupRouter)

setupInlineSvg(app)
setupSupabaseAuthListener()

app.mount('#app')
