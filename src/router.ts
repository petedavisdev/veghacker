import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue"
import Day from "./views/Day.vue"
import Log from "./views/Log.vue"
import Weeks from "./views/Weeks.vue"

const routes = [
    {
        path: "/",
        component: Home,
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
    history: createWebHistory(),
    routes,
})