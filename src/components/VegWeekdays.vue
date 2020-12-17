<template>
    <ul>
        <li v-for="day in weekdays" :key="day.key" :id="'day' + day">
            <input
                type="radio"
                :id="day"
                :value="day"
                name="day"
                @change="$emit('update:activeDay', $event.target.value)"
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
        activeDay: String
    },
    emits: [
        "update:activeDay",
    ],
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