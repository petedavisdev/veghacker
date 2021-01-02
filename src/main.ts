import { createApp } from 'vue'
import App from './App.vue'
import './modern-normalize.css'
import './index.css'
import vegetables from "../vegetables.json"
import { router } from './router'
import moment from 'moment'

const app = createApp(App)

app.use(router)
app.mount('#app')

export { vegetables, moment }