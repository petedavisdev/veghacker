<template>
	<header>
		VEGHACKER 0.1-alpha &nbsp;
		<a href="/about" class="fl-r">README</a>
	</header>

	<main>
		<router-link
			v-for="(array, date) in vegLog"
			:key="date"
			:to="'/log/' + date"
		>
			{{ nameDay(date) }}
			<VegArray :vegArray="array"> </VegArray>
		</router-link>
	</main>

	<app-footer />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { formatDate, shortenDate } from "../helpers";
import AppFooter from "../components/AppFooter.vue";
import VegArray from "../components/VegArray.vue";

export default defineComponent({
	components: {
		AppFooter,
		VegArray,
	},
	setup() {
		const log = JSON.parse(localStorage.getItem("vegLog")) || {};

		function createDays(start: Date): Object {
			const days = {};

			let date = new Date();

			while (date >= start) {
				days[shortenDate(date)] = [];

				date.setDate(date.getDate() - 1);
			}

			return days;
		}

		const vegLog = computed(() => {
			const logDays = createDays(new Date("2020-09-02"));

			const sortedLog = Object.keys(logDays)
				.sort()
				.reverse()
				.reduce((obj, key) => {
					// if the log contains the day
					if (log[key]) {
						obj[key] = log[key];
					} else {
						obj[key] = [];
					}

					return obj;
				}, {});

			return sortedLog;
		});

		const nameDay = (date) => formatDate(new Date(date));

		return {
			vegLog,
			nameDay,
		};
	},
});
</script>

<style scoped>
header {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	background-color: #124;
	padding: 1rem;
}

main {
	padding: 1em;
}
</style>