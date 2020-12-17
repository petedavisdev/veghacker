<template>
<teleport :to="'#day' + activeDay + ' .search-input-target'">
    <input
        @input="keyword = $event.target.value"
        type="search"
        :value="keyword"
        placeholder="search"
        @focus="showlist = true"
    />
</teleport>

    <ul v-show="showlist">
        <li v-for="veg in filteredVeg" :key="veg.key">
            <input
                v-model="checkedVeg"
                type="checkbox"
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
import { Veg } from '../types'
import VegCode from "./VegCode.vue"

export default defineComponent({
    components: {
        VegCode,
    },
    props: {
        log: Array,
        vegetables: Array,
        activeDay: String,
    },
    emits: [
        "update:log",
    ],
    setup (props, { emit }) {
        const checkedVeg = ref(props.log || [])
        const showlist = ref(false);
        
        const sortedCheckedVeg = computed(() => {
            return checkedVeg.value.sort((a: Veg, b: Veg) => {
                if (a.code < b.code) return -1
                if (a.code > b.code) return 1
                return 0;
            });
        });

        watch(() => props.activeDay, (newVal, prev) => {
            checkedVeg.value = props.log
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

        watch(checkedVeg, () => {
            emit("update:log", sortedCheckedVeg.value)
            keyword.value = ""
        })

        return {
            checkedVeg,
            keyword,
            filteredVeg,
            showlist,
        }
    },
})
</script>

<style scoped>

* {
    font-family: 'Courier New', Courier, monospace;
}

[type="search"] {
    display: block;
    width: 10ch;
    margin: 0.2em 0 0 13ch;
    padding: 1ch;
    font-size: inherit;
    font-weight: inherit;
    background-color: inherit;
    text-transform: uppercase;
    color: hotpink;
    border-color: hotpink;
}

[type="search"]::placeholder {
    text-transform: lowercase;
}

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
