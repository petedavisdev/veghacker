<template>
	<app-header />

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
import { formatDate, createWeek, shortenDate } from "../helpers";
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";
import VegArray from "../components/VegArray.vue";

export default defineComponent({
	components: {
		AppFooter,
		AppHeader,
		VegArray,
	},
	setup() {
		const log = JSON.parse(localStorage.getItem("vegLog")) || {};

		function createDays(start: Date): Object {
			const days = {};

			const date = new Date();
			const startMonday = new Date();

			startMonday.setDate(date.getDate() - date.getDay() - 6);
			console.log(startMonday);
			while (date >= startMonday) {
				days[shortenDate(date)] = [];

				date.setDate(date.getDate() - 1);
			}

			return days;
		}

		console.log(createWeek(new Date(), log));

		const vegLog = computed(() => {
			// TODO: Only create days for current week
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
main {
	padding: 1em;
}
</style>
