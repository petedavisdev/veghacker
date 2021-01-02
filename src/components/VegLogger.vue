<template>
    <LogPrompt :dayName="dayName" />
    
    <input
        type="search"
        :value="keyword"
        placeholder="search"
        @input="keyword = $event.target.value"
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

    <VegArray :vegArray="dayLog">{{ dayName }}</VegArray>

    <button>&#10003;</button>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { firestore } from '../firebase/config'
import { codesToVeg, formatDate, shortenDate, sortVeg, vegToCodes } from '../helpers'
import { vegetables } from '../main'
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

        function updateDayLog() {
            log[shortenDate(day)] = vegToCodes(dayLog.value)
            localStorage.setItem("log", JSON.stringify(log))
            keyword.value = ""
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

        onMounted(async () => {
            const userID = "YWkoqnVkzefB5ycsZ7m4"
            const userData = ref(null)

            try {
                const response = await firestore.collection('users').doc(userID).get()

                userData.value = { id: response.id, ...response.data() }
                
                console.log(userData.value)
            }
            catch (error) {
                console.error(error.message)
            }
        })

        return {
            allVeg,
            dayLog,
            dayName,
            filteredVeg,
            keyword,
            updateDayLog,
        }
    }
})
</script>

<style scoped>
* {
    font-family: 'Courier New', Courier, monospace;
}

h2 {
    font-family: inherit;
}

[type="search"] {
    display: block;
    
    padding: 1ch;
    font-size: inherit;
    font-weight: inherit;
    background-color: inherit;
    text-transform: uppercase;
    color: hotpink;
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