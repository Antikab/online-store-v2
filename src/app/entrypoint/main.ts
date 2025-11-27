// app/entrypoint/main.ts
import '@app/styles/main.css'

import { createApp } from 'vue'

import App from '@app/entrypoint/App.vue'
import { setupRouter } from '@app/providers/router'
import { setupPinia } from '@app/providers/pinia'

const app = createApp(App)

app.use(setupRouter)
app.use(setupPinia)

app.mount('#app')
