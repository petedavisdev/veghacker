<template>
  <a href="/">VEGHACKER v0.1</a>
  <UserGreeting v-model:username="user.name" />
  <VegChecklist v-model:log="user[dateYesterday]" :vegetables="sortedVeg" />
</template>

<script lang="ts">
import vegetables from './data/vegetables.json'
import UserGreeting from './components/UserGreeting.vue'
import VegChecklist from './components/VegChecklist.vue'
import { computed, reactive, watch } from 'vue'

export default {
  name: 'App',
  components: {
    UserGreeting,
    VegChecklist,
  },
  setup() {
    //const dateToday = new Date().toISOString().split('T')[0]

    const dateYesterday = "2020-12-15"

    const sortedVeg = computed(() => {
      return vegetables.sort(function(a, b){
          if(a.code < b.code) return -1
          if(a.code > b.code) return 1
          return 0
      })
    });

    const localUser = JSON.parse(localStorage.getItem("user"))

    const user = reactive(
      localUser || {
      name: "Veghacker" + Math.round(100 + 900*Math.random())
    })

    watch(user, () => localStorage.setItem("user", JSON.stringify(user)))
    
    return {
      dateYesterday,
      sortedVeg,
      user,
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

</style>
