import { createApp } from 'vue'
import App from './App.vue'
import './modern-normalize.css'
import './index.css'
import { router } from './router'

if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('service-worker.js')
    .then(() => console.log('Registration Successful'))
}

const app = createApp(App)

app.use(router)
app.mount('#app')
