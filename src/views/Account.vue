<template>
    <h1>Account</h1>


    <form @submit.prevent="login">
        <label for="email">
            Email
        </label>

        <input
            id="email"
            type="email"
            v-model="state.email"
            required
        />

        <button type="submit">
            ▷
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    setup() {
        const state = reactive({
            email: ""
        })

        function login() {
            console.log(state.email)
        }

        return {
            state,
            login
        }
    },
})
</script>
