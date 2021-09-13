<template>
	<header>
		<router-link to="log">
			<span>VEG</span><span>HAC</span><span>KER</span>
			0.1-alpha
		</router-link>

		<router-link to="account" class="fl-r">
			{{ userSession ? "Account" : "Log in" }}
		</router-link>

		<a href="/guide" class="fl-r">Guide</a>
	</header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { userSession } from "../supabase";

export default defineComponent({
	setup() {
		return {
			userSession,
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

span {
	color: yellowgreen;
	font-weight: bold;
}
span:first-of-type {
	color: yellow;
}
span:last-of-type {
	color: limegreen;
}
</style>