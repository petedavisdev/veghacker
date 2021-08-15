<template>
    <p>
        <slot />

        <span class="count"> // {{ vegArray.length }}</span>

        <div>
            [
            <template v-for="(meta, code, index) in vegObj" :key="index">
                {{ index ? "," : "" }}
                <VegCode :color="meta.colorLight">
                    {{ code }}
                </VegCode>
            </template>
            ]
        </div>
        
        <span class="search-input-target"></span>
    </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import vegetables from "../vegetables.json"
import VegCode from "./VegCode.vue"

export default defineComponent({
    components: {
        VegCode,
    },
    props: {
        vegArray: Array
    },
    computed: {
        vegObj() {
            const vegObject = {};

            this.vegArray.forEach(code => {
                if (code in vegetables) vegObject[code] = vegetables[code];
            })
            
            return vegObject;
        }
    }
})
</script>

<style scoped>

p {
    font-family: "Ubuntu Mono", monospace;
}

.count {
    float: right;
    color: green;
    margin-right: 1ch;
}

</style>
