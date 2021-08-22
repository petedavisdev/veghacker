<template>
	<h1>Account</h1>

	<form v-if="!userSession" @submit.prevent="login">
		<p>
			<label>
				Email
				<input v-model="state.email" type="email" required />
			</label>
		</p>

		<p>
			<label>
				<input type="checkbox" required />
				As and alpha veghacker, I am happy to be asked for feedback and
				I can tolerate a few bugs!
			</label>
		</p>

		<button type="submit">▷</button>
	</form>

	<template v-else>
		<Suspense>
			<template #default>
				<p>
					You are logged in as
					{{ userSession.user }}
				</p>
			</template>

			<template #fallback>
				<p>Loading...</p>
			</template>
		</Suspense>
	</template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { supabase } from "../supabase";

export default defineComponent({
	props: {
		userSession: Object,
	},
	setup() {
		const email = ref("");

		async function login() {
			try {
				const { error } = await supabase.auth.signIn({
					email: email.value,
				});

				if (error) return alert("Error logging in: " + error.message);

				alert("I've emailed you a magic login link!");
			} catch (error) {
				console.error("Error thrown:", error.message);
				return alert(error.error_description || error);
			}
		}

		return {
			email,
			login,
		};
	},
});
</script>
