<template>
  <main class="w-full sm:w-1/2 xl:w-1/3">
    <div class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white">
      <div class="mb-4">
        <label class="font-bold text-grey-darker block mb-2">Email</label>
        <input
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div class="flex flex-col gap-2">
        <a @click="handleLogin({ email })" href="#" class="btn-black-outline">
          Send me a magic link
        </a>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { handleLogin } from "@/vuetils/useAuth";

export default defineComponent({
  name: "Auth",
  setup() {
    const email = ref("");

    return {
      email,
      handleLogin
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
