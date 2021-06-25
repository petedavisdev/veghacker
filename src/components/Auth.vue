<template>
    <form @submit.prevent="handleLogin({ email })">
        <label>Email</label>
        <input type="email" v-model="email" required />
        <label>
            <input type="checkbox" required />
            As and early veghacker, I am happy to be asked for feedback and I
            can tolerate a few bugs!
        </label>

        <button type="submit">Send me a magic link</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { handleLogin } from "../vuetils/useAuth";

export default defineComponent({
    name: "Auth",
    setup() {
        const email = ref("");

        return {
            email,
            handleLogin,
        };
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
