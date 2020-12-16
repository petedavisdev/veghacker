<template>
    <h2>
        What veg did you eat {{ activeDay.name }}?
    </h2>

    <p>
        {{ activeDay.name }} = 
        <VegArray :veggies="yesterday" />
    </p>

    <input
        @input="keyword = $event.target.value"
        type="search"
        placeholder="search"
    />

    <ul>
        <li v-for="veg in filteredVeg" :key="veg.key">
            <input
                v-model="yesterday"
                type="checkbox"
                :name="activeDay.iso"
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
            colorLight?: string
            family: string[]
        }

        const activeDay = {
            name: "yesterday",
            iso: "2020-12-15",
        }

        const yesterday = ref(props.vegetables.filter( (veg: Veg) => {
            return props.log && props.log.includes(veg.code)
        }))

        const vegCodes = computed(() => {
            return yesterday.value.map( (veg: Veg) => veg.code )
        })

        const keyword = ref("")

        const filteredVeg = computed(() => {
            if (!keyword.value) return props.vegetables

            const term = keyword.value.toUpperCase()
            const isCode = code => code === term
            const isCodeStart = code => code.startsWith(term)
            const isCodePart = code => code.includes(term)
            const isFamilyPart = family => family.toString().toUpperCase().includes(term)

            const topResult = props.vegetables.filter((veg: Veg) => {
                return isCode(veg.code)
            })

            const greatResults = props.vegetables.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && isCodeStart(veg.code)
            })

            const goodResults = props.vegetables.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && !isCodeStart(veg.code)
                    && isCodePart(veg.code)
            })


            const otherResults = props.vegetables.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && !isCodeStart(veg.code)
                    && !isCodePart(veg.code)
                    && isFamilyPart(veg.family)
            })

            return [...topResult, ...greatResults, ...goodResults, ...otherResults]
        })

        watch(vegCodes, () => emit("update:log", vegCodes))

        return {
            activeDay,
            yesterday,
            keyword,
            filteredVeg,
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

[type="search"] {
    text-transform: uppercase;
    font-size: large;
    font-weight: inherit;
    background-color: inherit;
    color: inherit;
    width: 15ch;
}

[type="search"]::placeholder {
    text-transform: lowercase;
}

label {
    display: inline-block;
    max-width: 60ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.2em;
    background-color: #000919;
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
    margin-block: 0.1em;
}

p {
    font-size: large;
}
</style>
