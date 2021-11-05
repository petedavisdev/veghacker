<template>
	<app-header />

	<main>
		<div class="container">
			<table>
				<tr>
					<th colspan="7" scope="colgroup">This week</th>
					<th colspan="7" scope="colgroup" class="even">Last week</th>
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

					<td
						v-for="(day, index) in lastWeek"
						:key="index"
						class="even"
					>
						<router-link :to="'/log/' + day.date">
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
							<span class="count">
								{{ day.data.length }}
							</span>
							<span
								v-for="(veg, index) in day.data.sort()"
								:key="index"
								class="veg"
								:style="{ color: `var(--${veg})` }"
								>{{ veg }}</span
							>
						</router-link>
					</td>

					<td
						v-for="(day, index) in lastWeek"
						:key="index"
						class="even"
					>
						<router-link :to="'/log/' + day.date">
							<span class="count">
								{{ day.data.length }}
							</span>
							<span
								v-for="(veg, index) in day.data.sort()"
								:key="index"
								class="veg"
								:style="{ color: `var(--${veg})` }"
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
							{{ day.date }}
						</router-link>
					</td>

					<td
						v-for="(day, index) in lastWeek"
						:key="index"
						class="date even"
					>
						<router-link :to="'/log/' + day.date">
							{{ day.date }}
						</router-link>
					</td>
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
		const thisWeek = createWeek(today, log);
		const weekAgo = new Date(today.setDate(today.getDate() - 7));
		const lastWeek = createWeek(weekAgo, log);

		const nameDay = (date) => formatDate(new Date(date));

		return {
			nameDay,
			thisWeek,
			lastWeek,
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
	border-collapse: collapse;
}

.date {
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	font-family: monospace;
	text-align: end;
	vertical-align: middle;
}

th,
td {
	padding: 1ch;
	direction: ltr;
	vertical-align: bottom;
}

.count {
	color: royalblue;
}

.future,
.future * {
	color: #124;
	pointer-events: none;
}

.veg {
	display: block;
}

.even {
	background-color: #124;
}

.container {
	overflow-x: auto;
}
</style>
