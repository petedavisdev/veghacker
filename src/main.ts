import { createApp } from 'vue'
import App from './App.vue'
import './modern-normalize.css'
import './index.css'
import vegetables from "../vegetables.json"

createApp(App).mount('#app')

export { vegetables }