<template>
	<header>
		<router-link to="/"> Veghacker v0.1-alpha </router-link>

		<nav>
			<a href="/about"> About </a>
		</nav>
	</header>

	<router-view />
</template>

<script lang="ts">
import { Session } from "@supabase/supabase-js";
import { defineComponent, ref } from "vue";
import { supabase } from "./supabase";

export default defineComponent({
	setup() {
		const userSession = ref<Session | null>(null);

		supabase.auth.onAuthStateChange((event, session) => {
			userSession.value = session;
		});
	},
});
</script>


<style scoped>
a {
	text-decoration: none;
	font-size: small;
}

header {
	display: flex;
	justify-content: space-between;
	padding: 1em;
	background-color: #124;
}
</style>
