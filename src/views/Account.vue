<template>
    <main>
        <form v-if="!userSession && !submitted" @submit.prevent="login">
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
                    and I can tolerate a few bugs!
                </label>
            </p>

            <button type="submit">▷</button>
        </form>

        <template v-else-if="submitted">
            <p>Magic login link sent to {{ email }}</p>
            <p>Check your inbox and spam folder ;)</p>
            <button type="button" @click="submitted = false">
                &lt; Try again
            </button>
        </template>

        <template v-else>
            <Suspense>
                <template #default>
                    <p>
                        You are logged in as
                        <code>{{ userSession.user.email }}</code>
                    </p>
                </template>

                <template #fallback>
                    <p>Loading...</p>
                </template>
            </Suspense>
        </template>
    </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { supabase } from "../supabase";
import { userSession } from "../user";

export default defineComponent({
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
    padding: 1rem;
}
</style>