<template>
    <form>
        <label class="font-bold text-grey-darker block mb-2">Email</label>
        <input
            type="text"
            class="
                block
                appearance-none
                w-full
                bg-white
                border border-grey-light
                hover:border-grey
                px-2
                py-2
                rounded
                shadow
            "
            placeholder="Your email"
            v-model="email"
        />
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
