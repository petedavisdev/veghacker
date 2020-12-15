<template>
  <h1>
    Greetings,
    <input type="text" :value="username" @input="$emit('update:username', $event.target.value)" />
  </h1>

  <p>
    The <em>object</em> is to eat an <em>array</em> of vegetables every week.
  </p>
  
  <p>
    Your immune system is depending on you!
  </p>

  <h2>What vegetables did you eat today?</h2>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    username: String,
  },
  emits: [
    "update:username",
  ],
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