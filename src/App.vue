<template>
  <header>
    <router-link to="/">
      Veghacker v0.1-alpha
    </router-link>

    <nav>
      <a href="/about">
        About
      </a>
      <router-link to="account">
        Account
      </router-link>
    </nav>
  </header>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { supabase } from './supabase'

export default defineComponent({
  setup() {
    async function fetchVeglog() {
      try {
        
        const { data: accounts, error } = await supabase
          .from('accounts')
          .select('veglog,veglog_updated_at')

        if (error) {
          console.error("error", error)
          return
        }

        if (accounts === null) {
          return []
        }

        console.log("Accounts:", accounts)
        return
      } catch (err) {
        console.error("Error retrieving data from db", err)
      }
    }

    fetchVeglog()
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
}
</style>
