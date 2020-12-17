<template>
    [
    <template v-for="veg in veggies" :key="veg.key">
        <VegCode
            :code="veg.code"
            :colorLight="veg.colorLight"
        />,
    </template>
    
    ] // {{ veggies.length }}
    <span class="search-input-target"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VegCode from "./VegCode.vue"

export default defineComponent({
    components: {
        VegCode,
    },
    props: {
        veggies: Array
    },
})
</script>