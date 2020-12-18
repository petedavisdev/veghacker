<template>
  <h1>
    Greetings,
    <input type="text" v-model="username" @input="saveUsername" />
  </h1>

  <p>Your immune system needs your help!</p>

  <p>
    The <em>object</em> of being a veghacker is to eat an <em>array</em> of vegetables every week.
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const localUsername = localStorage.getItem("username")

        const username = ref(
            localUsername || "Veghacker" + Math.round(100 + 900 * Math.random())
        );

        function saveUsername() {
            localStorage.setItem("username", username.value)
        }

        return {
            username,
            saveUsername,
        }
    }
})
</script>

<style scoped>
input {
  font-size: inherit;
  font-weight: inherit;
  background-color: inherit;
  color: inherit;
  width: 15ch;
}
</style>
