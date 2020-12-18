<template>
    <p>
        <slot />
        = [
        <template v-for="veg in vegArray" :key="veg.key">
            <VegCode :colorLight="veg.colorLight">
                {{ veg.code }}
            </VegCode>,
        </template>
        
        ] // {{ vegArray.length }}
        <span class="search-input-target"></span>
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VegCode from "./VegCode.vue"

export default defineComponent({
    components: {
        VegCode,
    },
    props: {
        vegArray: Array
    },
})
</script>

<style scoped>

p {
    font-family: 'Courier New', Courier, monospace;
    color: gray;
}

</style>