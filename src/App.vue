<template>
  <a href="/">VEGHACKER v0.1-alpha</a>

  <UserGreeting v-model:username="user.name" />

  <h2>
      What veg did you eat {{ activeDay }}?
  </h2>

  <VegChecklist v-model:log="user[activeDay]" :day="activeDay" :days="days" :vegetables="sortedVeg" />
</template>

<script lang="ts">
import UserGreeting from "./components/UserGreeting.vue"
import VegChecklist from "./components/VegChecklist.vue"
import { computed, reactive, ref, watch } from "vue"
import { vegetables } from "./main"

export default {
  name: "App",
  components: {
    UserGreeting,
    VegChecklist,
  },
  setup() {
    const days = [
      "2020-12-14",
      "2020-12-15",
      "2020-12-16",
    ];

    const activeDay = ref(days[1]);

    const sortedVeg = computed(() => {
      return vegetables.sort(function (a, b) {
        if (a.code < b.code) return -1;
        if (a.code > b.code) return 1;
        return 0;
      });
    });

    const localUser = JSON.parse(localStorage.getItem("user"));

    const user = reactive(
      localUser || {
        name: "Veghacker" + Math.round(100 + 900 * Math.random()),
        created: new Date(),
      }
    );

    watch(user, () => {
      localStorage.setItem( "updated", new Date().toISOString() )
      localStorage.setItem( "user", JSON.stringify(user) )
    });

    return {
      activeDay,
      sortedVeg,
      user,
      days,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
