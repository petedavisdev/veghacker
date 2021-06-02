<template>
    <p>
        <slot />

        = [

        <div>
            <template v-for="veg in vegArray" :key="veg.key">
                <VegCode :colorLight="veg.colorLight">
                    {{ veg.code }}
                </VegCode>,
            </template>
        </div>

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
    font-family: "Ubuntu Mono", monospace;
    color: gray;
}

div {
    margin-left: 2ch;
}

</style>
