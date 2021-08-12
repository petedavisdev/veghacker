<template>
    <h1>
        Daily log
    </h1>

    <VegArray v-for="(array, date) in vegLog" :key="date" :vegArray="array">
        <router-link :to="'/log/' + date">
            {{ nameDay(date) }}
        </router-link> =
    </VegArray>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formatDate, shortenDate } from '../helpers'
import VegArray from '../components/VegArray.vue'

export default defineComponent({
    components: {
        VegArray,
    },
    setup () {
        const log = JSON.parse(localStorage.getItem("log")) || {}

        function createDays(start: Date): Object {
            const days = {}

            let date = new Date();

            while (date >= start) {
                days[shortenDate(date)] = []

                date.setDate(date.getDate() - 1)
            }

            return days
        }

        const vegLog = computed(() => {
            const logDays = createDays(new Date("2020-12-14"))

            const sortedLog = Object.keys(logDays)
                .sort()
                .reverse()
                .reduce((obj, key) => {
                    // if the log contains the day
                    if (log[key]) {
                        obj[key] = log[key]; 
                    } else {
                        obj[key] = [];
                    }

                    return obj;
                }, 
                {}
            )

            return sortedLog
        })

        const nameDay = (date) => formatDate(new Date(date))

        return {
            vegLog,
            nameDay,
        }
    },
})
</script>

<style scoped>

a:hover {
    text-decoration-color: hotpink;
}

</style>