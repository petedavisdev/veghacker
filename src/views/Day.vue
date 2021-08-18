<template>
    <!-- <Suspense>
        <template #default> -->
            <header>
                <LogPrompt :dayName="dayName" />

                <input
                    type="search"
                    :value="keyword"
                    placeholder="SEARCH"
                    @input="keyword = $event.target.value"
                    ref="searchinput"
                />
            </header>

            <ul>
                <li v-for="(meta, code) in filteredVeg" :key="code">
                    <input
                        v-model="dayLog"
                        type="checkbox"
                        :id="code"
                        :value="code"
                        @change="updateDayLog"
                    />

                    <label :for="code">
                        <VegCode :color="meta.colorLight">
                            {{ code }}
                        </VegCode>
                        = {{ JSON.stringify(meta.family).replace(/['"]+/g, " ") }}
                    </label>
                </li>
            </ul>

            <footer>
                <VegArray :vegArray="dayLog"> {{ dayName }} = </VegArray>

                <router-link to="/log" @click="updateVeglog"> ▷ </router-link>
            </footer>
        <!-- </template>


        <template #fallback>
            <p>Loading...</p>
        </template>
    </Suspense> -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { formatDate, shortenDate } from "../helpers";
import vegetables from "../vegetables.json";
import LogPrompt from "../components/LogPrompt.vue";
import VegArray from "../components/VegArray.vue";
import VegCode from "../components/VegCode.vue";
import { supabase } from "../supabase";
import { getVeglog } from "../vuetils/getVeglog";
import { userSession } from "../vuetils/useAuth";

export default defineComponent({
    components: {
        LogPrompt,
        VegArray,
        VegCode,
    },
    setup() {
        const route = useRoute();

        const routeDay = route.params.date?.toString();

        const day = routeDay ? new Date(routeDay) : new Date();

        const dayKey = shortenDate(day);

        const dayName = formatDate(day);

        const log = getVeglog();

        const dayLog = ref((log && log[dayKey]) || []);

        const keyword = ref("");

        const searchinput = ref(null);

        function updateDayLog() {
            // update and store log
            log[dayKey] = dayLog.value;
            localStorage.setItem("log", JSON.stringify(log));

            // update and store timestamp
            const timestamp = new Date().toISOString();
            localStorage.setItem("veglog_updated_at", timestamp);

            // focus back on search input after each update
            if (keyword.value) {
                keyword.value = "";
                searchinput.value.focus();
            }
        }

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
            const vegEntries: any = Object.entries(sortedVeg);

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

        /**
         * Targets a specific todo via its record id and updates the is_completed attribute.
         */
        async function updateVeglog() {
            if (!userSession.value) return;

            try {
                const { error } = await supabase
                    .from("accounts")
                    .update({ veglog: log, veglog_updated_at: veglogUpdatedAt })
                    .eq("id", 1)
                    .single();

                if (error) {
                    alert(error.message);
                    console.error("There was an error updating", error);
                    return;
                }

                console.log("Updated account", 1);
            } catch (err) {
                alert("Error");
                console.error("Unknown problem updating record", err);
            }
        }

        return {
            dayLog,
            dayName,
            filteredVeg,
            keyword,
            updateDayLog,
            searchinput,
            updateVeglog,
        };
    },
});
</script>

<style scoped>
header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: #124;
    padding: 1px 1rem 1ch;
}

h1 {
    font-size: 1.15em;
}

[type="search"] {
    width: 100%;
    padding: 1ch;
    text-transform: uppercase;
    background-color: gainsboro;
}

[type="checkbox"] {
    position: absolute;
    opacity: 0;
}

label {
    font-family: "Ubuntu Mono", monospace;
    display: inline-block;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin: 0.1em;
    padding: 0.5ch;
    background-color: #000;
}

:checked + label {
    background-color: #235;
}

ul {
    list-style: none;
    padding-inline: 1em 1ch;
    overflow-x: hidden;
}

li {
    display: flex;
    align-items: baseline;
}

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding-left: 1em;
    background-color: #124;
}

a {
    display: grid;
    place-content: center;
    font-size: xx-large;
    color: #124;
    background-color: limegreen;
    text-decoration: none;
    cursor: pointer;
    height: 100%;
    min-width: 68px;
    aspect-ratio: 1 / 1;
}
</style>