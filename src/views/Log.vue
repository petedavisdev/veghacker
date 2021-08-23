<template>
    <AppHeader>
        <h1>Daily log</h1>
    </AppHeader>

    <main>
        <router-link
            v-for="(array, date) in vegLog"
            :key="date"
            :to="'/log/' + date"
        >
            <VegArray :vegArray="array">
                {{ nameDay(date) }}
            </VegArray>
        </router-link>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { formatDate, shortenDate } from "../helpers";
import AppHeader from "../components/AppHeader.vue";
import VegArray from "../components/VegArray.vue";

export default defineComponent({
    components: {
        AppHeader,
        VegArray,
    },
    setup() {
        const log = JSON.parse(localStorage.getItem("vegLog")) || {};

        function createDays(start: Date): Object {
            const days = {};

            let date = new Date();

            while (date >= start) {
                days[shortenDate(date)] = [];

                date.setDate(date.getDate() - 1);
            }

            return days;
        }

        const vegLog = computed(() => {
            const logDays = createDays(new Date("2020-09-02"));

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
                }, {});

            return sortedLog;
        });

        const nameDay = (date) => formatDate(new Date(date));

        return {
            vegLog,
            nameDay,
        };
    },
});
</script>

<style scoped>
main {
    padding-inline: 1em;
}

h1 {
    padding: 0 1rem 1rem;
}
</style>