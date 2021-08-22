import { createApp, ref } from 'vue'
import App from './App.vue'
import './modern-normalize.css'
import './index.css'
import { router } from './router'
import { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { userSession } from './user'

if ('serviceWorker' in navigator) {
  navigator
    .serviceWorker
    .register('service-worker.js')
    .then(() => console.log('Registration Successful'))
}

const app = createApp(App)

app.use(router);
app.mount('#app');

supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session
});
