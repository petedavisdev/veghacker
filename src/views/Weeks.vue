<template>
    <h1>Weekly totals</h1>
    <div>
        {{ a }}
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        const a = moment("2020-12-21").isoWeek()
        
        return {
            a
        }
    }
})
</script>

<style scoped>

</style>