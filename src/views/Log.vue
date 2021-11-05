<template>
	<app-header />

	<main>
		<div style="overflow-x: auto">
			<table>
				<tr>
					<th colspan="7" scope="colgroup">This week</th>
				</tr>

				<tr>
					<td
						v-for="(day, index) in thisWeek"
						:key="index"
						:class="day.future"
					>
						{{ day.name }}
					</td>
				</tr>

				<tr>
					<td
						v-for="(day, index) in thisWeek"
						:key="index"
						:class="day.future"
					>
						<router-link :to="'/log/' + day.date">
							<span
								v-for="(veg, index) in day.data"
								:key="index"
								:class="'veg' + veg"
								>{{ veg }}</span
							>
						</router-link>
					</td>
				</tr>

				<tr>
					<td
						v-for="(day, index) in thisWeek"
						:key="index"
						class="date"
						:class="day.future && 'future'"
					>
						{{ day.date }}
					</td>
				</tr>
			</table>
		</div>
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

		const thisWeek = createWeek(new Date(), log);

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
			thisWeek,
		};
	},
});
</script>

<style scoped>
main {
	direction: rtl;
	padding: 1em;
}

table {
	min-width: 100%;
}

.date {
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	font-family: monospace;
}

th,
td {
	padding: 1ch;
	direction: ltr;
}

.future {
	color: silver;
}

[class^="veg"] {
	display: block;
}
</style>
