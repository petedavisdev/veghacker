<template>
	<div>
		<span class="count"> // {{ vegArray.length }}</span>

		[<VegCode
			v-for="(meta, code, index) in vegObj"
			:key="index"
			:color="meta.colorLight"
			>{{ code }}</VegCode
		>]

		<span class="search-input-target"></span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vegetables from "../vegetables.json";
import VegCode from "./VegCode.vue";

export default defineComponent({
    components: {
        VegCode,
    },
    props: {
        vegArray: Array,
        default: [],
    },
    computed: {
        vegObj() {
            const vegObject = {};

            this.vegArray.forEach((code) => {
                if (code in vegetables) vegObject[code] = vegetables[code];
            });

            return vegObject;
        },
    },
});
</script>

<style scoped>
.count {
    float: right;
    color: green;
    margin-right: 1ch;
}

div {
    color: silver;
    margin-bottom: 1ch;
}
</style>
