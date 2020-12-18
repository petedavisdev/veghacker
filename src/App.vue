<template>
  <nav>
    <router-link to="/">VEGHACKER v0.2-alpha</router-link>
    <router-link to="/log">Log</router-link>
  </nav>

  <router-view />
</template>

<script lang="ts">
import { computed, reactive, ref, watch } from "vue"
</script>

<style scoped>
a {
  text-decoration: none;
}

nav {
  display: flex;
  justify-content: space-between;
}
</style>
