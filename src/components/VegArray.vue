<template>
    <p>
        <slot />

        <div>
            [
            <template v-for="(meta, code, index) in vegObj" :key="index">
                {{ index ? "," : "" }}
                <VegCode :color="meta.colorLight">
                    {{ code }}
                </VegCode>
            </template>
            ]
            //{{ vegArray.length }}
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
    color: gray;
}

</style>
