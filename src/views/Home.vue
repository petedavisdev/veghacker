<template>
    <UserGreeting />

    <VegLogger />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import UserGreeting from "../components/UserGreeting.vue"
import VegLogger from "../components/VegLogger.vue"

export default defineComponent({
  components: {
    UserGreeting,
    VegLogger,
  },
})
</script>

<style scoped>

</style>