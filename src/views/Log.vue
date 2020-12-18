<template>
    <VegArray v-for="(array, date) in vegLog" :key="date" :vegArray="array">
        <router-link :to="'/day/' + date">{{ nameDay(date) }}</router-link>
    </VegArray>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { codesToVeg, formatDate, shortenDate } from '../helpers'
import VegArray from '../components/VegArray.vue'

export default defineComponent({
    components: {
        VegArray,
    },
    setup () {
        const log = JSON.parse(localStorage.getItem("log")) || {}

        function createDays(start: Date): Object {
            const days = {}

            let date = start

            do {
                days[shortenDate(date)] = []

                date.setDate(date.getDate() + 1)
            }
            while (date <= new Date())

            return days
        }

        const weekdays = createDays(new Date("2020-12-14"))

        const vegLog = computed(() => {
            const data = weekdays

            Object.entries(log)
                .sort()
                .reverse()
                .forEach(([key, value]: any) => {
                data[key] = codesToVeg(value)
            })

            return data
        })

        const nameDay = (name) => formatDate(new Date(name))

        return {
            vegLog,
            nameDay,
        }
    },
})
</script>

<style scoped>

a {
    display: inline-block;
    min-width: 10ch;
    text-align: right;
}

</style>