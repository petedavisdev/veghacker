<template>
	<app-header />

	<main>
		<div class="container">
			<table>
				<tr>
					<td v-for="(day, index) in thisWeekLog" :key="index">
						<router-link
							:to="'/log/' + day.date"
							:class="day.future && 'future'"
						>
							<span class="count">
								{{ day.data.length }}
							</span>
							<strong
								v-for="(veg, index) in day.data.sort()"
								:key="index"
								class="code"
								:style="{ color: `var(--${veg})` }"
								>{{ veg }}</strong
							>
						</router-link>
					</td>

					<td v-for="(day, index) in lastWeek" :key="index">
						<router-link :to="'/log/' + day.date">
							<span class="count">
								{{ day.data.length }}
							</span>
							<strong
								v-for="(veg, index) in day.data.sort()"
								:key="index"
								class="code"
								:style="{ color: `var(--${veg})` }"
								>{{ veg }}</strong
							>
						</router-link>
					</td>
				</tr>

				<tr>
					<td v-for="(day, index) in thisWeekLog" :key="index">
						<router-link
							:to="'/log/' + day.date"
							:class="day.future && 'future'"
						>
							{{ day.name }}
						</router-link>
					</td>

					<td v-for="(day, index) in lastWeek" :key="index">
						<router-link :to="'/log/' + day.date">
							{{ day.name }}
						</router-link>
					</td>
				</tr>

				<tr>
					<th colspan="7" scope="colgroup" class="week">
						<h3>This week</h3>
						<VegArray :vegArray="thisWeekTotal" class="total" />
					</th>
					<th colspan="7" scope="colgroup" class="week">
						<h3>Last week</h3>
						<VegArray :vegArray="lastWeekTotal" class="total" />
					</th>
				</tr>
			</table>
		</div>
	</main>

	<app-footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate, createWeek } from "../helpers";
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
		const today = new Date();
		const [thisWeekLog, thisWeekTotal] = createWeek(today, log);
		const weekAgo = new Date(today.setDate(today.getDate() - 7));
		const [lastWeekLog, lastWeekTotal] = createWeek(weekAgo, log);

		const nameDay = (date) => formatDate(new Date(date));

		return {
			nameDay,
			thisWeekLog,
			thisWeekTotal,
			lastWeekLog,
			lastWeekTotal,
		};
	},
});
</script>

<style scoped>
main {
	direction: rtl;
}

table {
	min-width: 100%;
	text-align: center;
}

th,
td {
	padding: 1ch;
	direction: ltr;
	vertical-align: bottom;
}

th {
	padding-inline: 2ch;
}

.count {
	color: royalblue;
}

.future,
.future * {
	color: #124;
	pointer-events: none;
}

.code {
	display: block;
}

.container {
	overflow-x: auto;
}

.week {
	background-color: #124;
	border-radius: 1ch;
}
</style>
