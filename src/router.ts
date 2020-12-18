import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue"
import Day from "./views/Home.vue"
import Log from "./views/Log.vue"

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/log",
        component: Log,
    },
    {
        path: "/day/:date",
        component: Day,
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})