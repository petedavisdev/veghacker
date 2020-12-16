<template>
  <h1>
    Greetings,
    <input type="text" :value="username" @input="$emit('update:username', $event.target.value)" />
  </h1>

  <p>Your immune system needs your help!</p>

  <p>
    The <em>object</em> of being a veghacker is to eat an <em>array</em> of vegetables every week.
  </p>
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
