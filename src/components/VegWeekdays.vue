<template>
    <ul>
        <li v-for="day in weekdays" :key="day.key">
            <input
                v-model="activeDay"
                type="radio"
                :id="day"
                :value="day"
                :checked="day === active"
            />
            <label :for="day">
                {{ day }} =
                <VegArray :veggies="user[day] || []" />
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
        user: Object,
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
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0.1em;
    padding: 0.2em 0.5em;
    background-color: #000919;
    color: gray;
}

:checked + label {
    background-color: midnightblue;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: baseline;
}
</style>