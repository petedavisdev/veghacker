<template>
	<app-header />

	<main>
		<form v-if="!userSession && !submitted" @submit.prevent="login">
			<h1>Login</h1>
			<p>Backup your veg and use Veghacker on multiple devices 😎</p>
			<p>
				<label>
					Email
					<input v-model="email" type="email" required />
				</label>
			</p>

			<p>
				<label>
					<input type="checkbox" required />
					As an alpha veghacker, I am happy to be asked for feedback
					and I can tolerate the odd bug!
				</label>
			</p>

			<button type="submit">Send me a magic login link ✨</button>
		</form>

		<article v-else-if="submitted && !userSession">
			<p>Magic login link sent to {{ email }}</p>
			<p>Check your inbox and spam folder 😉</p>
			<button type="button" @click="submitted = false">
				&lt; Try again
			</button>
		</article>

		<template v-else>
			<Suspense>
				<template #default>
					<article>
						<p>
							You are logged in as
							<strong>{{ userSession.user.email }}</strong>
						</p>
						<p>
							Thank you for trying out
							<router-link to="log">Veghacker alpha</router-link>!
						</p>
						<p>
							If you would like to encourage me to take the app to
							the next level, you can
							<a href="https://www.buymeacoffee.com/petedavis">
								buy me a coffee
							</a>
							😉
						</p>

						<p>Cheers!</p>

						<p><i>Pete</i> 😃</p>
					</article>
				</template>

				<template #fallback>
					<article>Loading...</article>
				</template>
			</Suspense>
		</template>
	</main>

	<app-footer></app-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createProfile, supabase, userSession } from "../supabase";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default defineComponent({
    components: {
        AppHeader,
        AppFooter,
    },
    setup() {
        const email = ref("");
        const submitted = ref(false);

        async function login() {
            try {
                const { error } = await supabase.auth.signIn({
                    email: email.value,
                });

                if (error) return alert("Error logging in: " + error.message);

                submitted.value = true;
            } catch (error) {
                console.error("Error thrown:", error.message);
                return alert(error.error_description || error);
            }
        }

        createProfile();

        return {
            email,
            login,
            submitted,
            userSession,
        };
    },
});
</script>

<style scoped>
main {
    display: grid;
    place-content: center;
    padding: 1rem;
}

[type="email"] {
    display: block;
    width: 100%;
    border-width: 2px;
    padding: 0.5em;
}

button {
    display: block;
    width: 100%;
    color: deepskyblue;
    background-color: #124;
    border-color: deepskyblue;
    border-width: 2px;
    padding: 0.5em;
}

article,
form {
    max-width: 60ch;
}
</style>
