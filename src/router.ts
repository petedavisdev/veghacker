import { createRouter, createWebHashHistory } from 'vue-router'
import Day from "./views/Day.vue"
import Log from "./views/Log.vue"

const routes = [
    {
        path: "/",
        component: Day,
    },
    {
        path: "/log",
        component: Log,
    },
    {
        path: "/log/:date",
        component: Day,
    },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
