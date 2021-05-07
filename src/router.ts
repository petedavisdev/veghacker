import { createRouter, createWebHashHistory } from 'vue-router'
import Day from "./views/Day.vue"
import Log from "./views/Log.vue"

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
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
