import '@app/styles/main.css'

import { createApp } from 'vue'

import App from '@app/entrypoint/App.vue'
import { setupSupabaseAuthListener, setupPinia, setupRouter } from '@app/providers'

const app = createApp(App)

app.use(setupPinia)
app.use(setupRouter)

setupSupabaseAuthListener()

app.mount('#app')
