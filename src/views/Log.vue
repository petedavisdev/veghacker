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

					<td v-for="(day, index) in lastWeekLog" :key="index">
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
							class="date"
						>
							{{ day.name }}
						</router-link>
					</td>

					<td v-for="(day, index) in lastWeekLog" :key="index">
						<router-link :to="'/log/' + day.date" class="date">
							{{ day.name }}
						</router-link>
					</td>
				</tr>

				<tr>
					<th colspan="7" scope="colgroup" class="week">
						<h2>This week</h2>
						<VegArray :vegArray="thisWeekTotal" class="total" />
					</th>
					<th colspan="7" scope="colgroup" class="week">
						<h2>Last week</h2>
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
	border-spacing: 2ch;
}

th,
td {
	direction: ltr;
}

td {
	vertical-align: bottom;
}

th {
	min-width: 36ch;
	vertical-align: top;
	padding-bottom: 1em;
	border-block: 2px solid #124;
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
</style>
