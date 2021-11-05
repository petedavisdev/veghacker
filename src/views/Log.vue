<template>
	<app-header />

	<main>
		<div style="overflow-x: auto">
			<table>
				<tr>
					<th colspan="7" scope="colgroup">This week</th>
				</tr>

				<tr>
					<td v-for="(day, index) in thisWeek" :key="index">
						<router-link
							:to="'/log/' + day.date"
							:class="day.future && 'future'"
						>
							{{ day.name }}
						</router-link>
					</td>
				</tr>

				<tr>
					<td v-for="(day, index) in thisWeek" :key="index">
						<router-link
							:to="'/log/' + day.date"
							:class="day.future && 'future'"
						>
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
					>
						<router-link
							:to="'/log/' + day.date"
							:class="day.future && 'future'"
						>
							{{ nameDay(day.date) }}
						</router-link>
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

		const thisWeek = createWeek(new Date(), log);

		const nameDay = (date) => formatDate(new Date(date));

		return {
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
	text-align: end;
}

th,
td {
	padding: 1ch;
	direction: ltr;
}

.future {
	color: #124;
	pointer-events: none;
}

[class^="veg"] {
	display: block;
}
</style>
