<template>
    <ul>
        <li v-for="day in weekdays" :key="day.key" :id="'day' + day">
            <input
                v-model="activeDay"
                type="radio"
                :id="day"
                :value="day"
            />
            <label :for="day">
                {{ day }} =
                <VegArray :veggies="log[day] || []" />
            </label>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import VegArray from "./VegArray.vue"

export default defineComponent({
    components: {
        VegArray,
    },
    props: {
        weekdays: Array,
        log: Object,
        active: String
    },
    emits: [
        "update:active",
    ],
    setup (props, { emit }) {
        const activeDay = ref(props.active)

        watch(activeDay, () => {
            emit("update:active", activeDay.value)
        })

        return {
            activeDay
        }
    }
})
</script>

<style scoped>

label {
    min-width: max-content;
    margin: 0.1em;
    padding: 0.5em 0.5em;
    background-color: #000919;
    color: gray;
}

:checked + label {
    background-color: midnightblue;
}

ul {
    list-style: none;
    padding: 0;
    font-size: large;
}

li {
    display: flex;
    align-items: baseline;
    font-family: 'Courier New', Courier, monospace;
}

</style>