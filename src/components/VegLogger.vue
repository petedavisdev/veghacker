<template>
    <LogPrompt :dayName="dayName" />
    
    <input
        type="search"
        :value="keyword"
        placeholder="search"
        @input="keyword = $event.target.value"
        ref="searchinput"
    />

    <ul>
        <li v-for="veg in filteredVeg" :key="veg.key">
            <input
                v-model="dayLog"
                type="checkbox"
                :id="veg.code"
                :value="veg"
                @change="updateDayLog"
            />

            <label :for="veg.code">
                <VegCode :colorLight="veg.colorLight">{{ veg.code }}</VegCode> = {{ veg.family }}
            </label>
        </li>
    </ul>

    <aside>
        <h2>
            Can't find what you're looking for?
        </h2>

        <p>
            Similar vegetables are grouped together. If you can't find what you're looking for, choose the closest thing on the list.
        </p>
    </aside>

    <footer>
        <VegArray :vegArray="dayLog">{{ dayName }}</VegArray>

        <router-link to="/log" class="button">
            &#10003;
        </router-link>
    </footer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { codesToVeg, formatDate, shortenDate, sortVeg, vegToCodes } from '../helpers'
import vegetables from "../vegetables.json"
import { Veg } from '../types'
import LogPrompt from './LogPrompt.vue'
import VegArray from './VegArray.vue'
import VegCode from './VegCode.vue'

export default defineComponent({
    components: {
        LogPrompt,
        VegArray,
        VegCode,
    },
    setup () {
        const route = useRoute()

        const routeDay = route.params.date?.toString()

        const day = routeDay ? new Date(routeDay) : new Date()

        const dayName = formatDate(day)

        const log = JSON.parse(localStorage.getItem("log")) || {}

        const dayLog = ref(log && log[shortenDate(day)] && codesToVeg(log[shortenDate(day)]) || [])

        const allVeg = sortVeg(vegetables)
        
        const keyword = ref("")

        const searchinput = ref(null);

        function updateDayLog() {
            log[shortenDate(day)] = vegToCodes(dayLog.value)
            localStorage.setItem("log", JSON.stringify(log))
            
            if (keyword.value) {
                keyword.value = ""
                console.log(searchinput.value)
                searchinput.value.focus()
            }
        }
        
        const filteredVeg = computed(() => {
            if (!keyword.value) return allVeg

            const term = keyword.value.toUpperCase()
            const isCode = code => code === term
            const isCodeStart = code => code.startsWith(term)
            const isCodePart = code => code.includes(term)
            const isFamilyPart = family => family.toString().toUpperCase().includes(term)

            const topResult = allVeg.filter((veg: Veg) => {
                return isCode(veg.code)
            })

            const greatResults = allVeg.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && isCodeStart(veg.code)
            })
            
            const goodResults = allVeg.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && !isCodeStart(veg.code)
                    && isCodePart(veg.code)
            })

            const otherResults = allVeg.filter((veg: Veg) => {
                return !isCode(veg.code)
                    && !isCodeStart(veg.code)
                    && !isCodePart(veg.code)
                    && isFamilyPart(veg.family)
            })

            return [...topResult, ...greatResults, ...goodResults, ...otherResults]
        })

        return {
            allVeg,
            dayLog,
            dayName,
            filteredVeg,
            keyword,
            updateDayLog,
            searchinput,
        }
    }
})
</script>

<style scoped>
* {
    font-family: "Ubuntu Mono", monospace;
}

h1 {
    font-family: inherit;
    font-size: 1.15em;
}

[type="search"] {
    display: block;
    width: 100%;
    position: sticky;
    top: 0;
    padding: 1ch;
    font-size: inherit;
    font-weight: inherit;
    background-color: inherit;
    text-transform: uppercase;
    color: hotpink;
    background-color: #000919;
    border-radius: 0;
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
    padding-left: 1ch;
}

li {
    display: flex;
    align-items: baseline;
}

footer {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    width: 100vw;
    margin-left: -1rem;
    margin-bottom: -1rem;
    background-color: midnightblue;
    padding: 0 1ch;
}

</style>