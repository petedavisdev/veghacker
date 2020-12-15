<template>
    <p>
        today = 
        <VegArray :veggies="today" />
    </p>
    <ul>
        <li v-for="veg in vegetables" :key="veg.key">
            <input
                v-model="today"
                type="checkbox"
                name="today"
                :id="veg.code"
                :value="veg"
            />

            <label :for="veg.code">
                <VegCode :code="veg.code" :colorLight="veg.colorLight" /> = {{ veg.family }}
            </label>
        </li>
    </ul>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import VegArray from "./VegArray.vue"
import VegCode from "./VegCode.vue"

export default defineComponent({
    components: {
        VegArray,
        VegCode,
    },
    props: {
        log: Array,
        vegetables: Array,
    },
    emits: [
        "update:log",
    ],
    setup (props, { emit }) {
        interface Veg {
            code: string
            colorLight: string
            family: string[]
        }

        const today = ref(props.vegetables.filter( (veg: Veg) => props.log && props.log.includes(veg.code)))
        const vegCodes = computed(() => today.value.map( (veg: Veg) => veg.code ))
        watch(vegCodes, () => emit("update:log", vegCodes))

        return {
            today,
            vegCodes,
        }
    },
})
</script>

<style scoped>

* {
    font-family: 'Courier New', Courier, monospace;
    color: gray;
}

:checked + label {
    background-color: midnightblue;
}

ul {
    list-style: none;
    padding: 0;
}

</style>