import { createRouter, createWebHashHistory } from 'vue-router'
import Day from "./views/Day.vue"
import Log from "./views/Log.vue"
import Weeks from "./views/Weeks.vue"

const routes = [
    {
        path: "/",
        component: Day,
    },
    {
        path: "/day/:date",
        component: Day,
    },
    {
        path: "/log",
        component: Log,
    },
    {
        path: "/weeks",
        component: Weeks,
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
