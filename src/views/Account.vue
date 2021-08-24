<template>
	<form @submit.prevent="login">
		<label for="email"> Email </label>

		<input id="email" type="email" v-model="state.email" required />

		<button type="submit">▷</button>
	</form>

	<app-footer />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import AppFooter from "../components/AppFooter.vue";

export default defineComponent({
	components: {
		AppFooter,
	},
	setup() {
		const state = reactive({
			email: "",
		});

		function login() {
			console.log(state.email);
		}

		return {
			state,
			login,
		};
	},
});
</script>
