<template>
    <h1>
        What veg
        {{ dayName === "today" ? "have you eaten" : "did you eat" }}
        {{ dayName }}?
    </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        dayName: String,
    }
})
</script>

<style scoped>

</style>