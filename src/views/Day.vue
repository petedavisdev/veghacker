<template>
    <AppHeader>
        <VegArray :vegArray="dayLog" class="total">
            <h1>{{ dayName }}</h1>
        </VegArray>

        <input
            type="search"
            :value="keyword"
            placeholder="Search"
            @input="keyword = $event.target.value"
            ref="searchinput"
        />
    </AppHeader>

    <main>
        <label v-for="(meta, code) in filteredVeg" :key="code">
            <input
                v-model="dayLog"
                type="checkbox"
                :value="code"
                @change="updateDayLog"
            />

            <VegCode :color="meta.colorLight">
                {{ code }}
            </VegCode>
            =
            {{
                JSON.stringify(meta.family)
                    .replace(/["]+/g, " ")
                    .replace(/[,]+/g, ", ")
            }}
        </label>
    </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { formatDate, shortenDate } from "../helpers";
import vegetables from "../vegetables.json";
import AppHeader from "../components/AppHeader.vue";
import VegArray from "../components/VegArray.vue";
import VegCode from "../components/VegCode.vue";
interface Veg {
    family: string[];
}

export default defineComponent({
    components: {
        AppHeader,
        VegArray,
        VegCode,
    },
    setup() {
        const route = useRoute();

        const routeDay = route.params.date?.toString();

        const day = routeDay ? new Date(routeDay) : new Date();

        const dayKey = shortenDate(day);

        const dayName = formatDate(day);

        const log = JSON.parse(localStorage.getItem("vegLog")) || {};

        const dayLog = ref((log && log[dayKey]) || []);

        const keyword = ref("");

        const searchinput = ref(null);

        function updateDayLog() {
            log[dayKey] = dayLog.value;
            localStorage.setItem("vegLog", JSON.stringify(log));

            // focus back on search input after each update
            if (keyword.value) {
                keyword.value = "";
                searchinput.value.focus();
            }
        }

        // TODO sort veg by code

        const filteredVeg = computed(() => {
            const sortedVeg = {};

            // Sort alhoabetically by key
            Object.keys(vegetables)
                .sort()
                .forEach((key) => {
                    sortedVeg[key] = vegetables[key];
                });

            if (!keyword.value) return sortedVeg;

            const term = keyword.value.toUpperCase();
            const vegEntries = Object.entries(sortedVeg);

            const topEntries = vegEntries.filter(([key]) =>
                key.startsWith(term)
            );

            const strongEntries = vegEntries.filter(([key]) =>
                key.includes(term)
            );

            const goodEntries = vegEntries.filter(([key, value]) => {
                console.log(value.family);
                return value.family.toString().toUpperCase().includes(term);
            });

            return {
                ...Object.fromEntries(topEntries),
                ...Object.fromEntries(strongEntries),
                ...Object.fromEntries(goodEntries),
            };
        });

        return {
            dayLog,
            dayName,
            filteredVeg,
            keyword,
            updateDayLog,
            searchinput,
        };
    },
});
</script>

<style scoped>
main {
    padding: 1em;
}

[type="search"] {
    padding: 1ch 1em;
    background-color: gainsboro;
    width: 100%;
}

[type="checkbox"] {
    height: 1rem;
}

label {
    font-family: "Ubuntu Mono", monospace;
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin: 0.5ch;
}

label * {
    padding: 1ch 0 1ch 1ch;
}

:checked ~ * {
    background-color: #346;
}

aside {
    padding: 1em;
}

.total {
    padding-inline: 1em 1ch;
}
</style>
