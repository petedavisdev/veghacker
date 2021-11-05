<template>
	<div>
		<span class="count"> // {{ vegArray.length }}</span>

		[<span
			v-for="(meta, code, index) in vegObj"
			:key="index"
			:style="{ color: `var(--${code})` }"
			class="code"
			>{{ code }}</span
		>]

		<span class="search-input-target"></span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import vegetables from "../vegetables.json";

export default defineComponent({
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
	color: royalblue;
	margin-right: 1ch;
}

.code {
	display: inline-block;
	color: v-bind(color);
	font-weight: bold;
	margin-inline: 0.25ch;
}

div {
	color: silver;
	margin-bottom: 1ch;
}
</style>
