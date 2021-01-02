import { createApp } from 'vue'
import App from './App.vue'
import './modern-normalize.css'
import './index.css'
import vegetables from "../vegetables.json"
import { router } from './router'
import moment from 'moment'
import { firestore } from './firebase/config'

const load = async () => {
    let users = []

    try {
        const response = await firestore.collection('users').get()

        users = response.docs.map( doc => {
            return { id: doc.id, ...doc.data() }
        })
        
        console.log(users)
    }
    catch (error) {
        console.error(error.message)
    }
}

load()

const app = createApp(App)

app.use(router)
app.mount('#app')

export { vegetables, moment }