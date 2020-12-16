<template>
  <a href="/">VEGHACKER v0.1-alpha</a>

  <UserGreeting v-model:username="user.name" />

  <h2>
      What veg did you eat {{ activeDay }}?
  </h2>

  <VegWeekdays v-model:active="activeDay" :weekdays="weekdays" :user="user" />

  <VegChecklist v-model:log="user[activeDay]" :activeDay="activeDay" :vegetables="sortedVeg" />
</template>

<script lang="ts">
import UserGreeting from "./components/UserGreeting.vue"
import VegChecklist from "./components/VegChecklist.vue"
import VegWeekdays from "./components/VegWeekdays.vue"
import { computed, reactive, ref, watch } from "vue"
import { vegetables } from "./main"

export default {
  name: "App",
  components: {
    UserGreeting,
    VegWeekdays,
    VegChecklist,
  },
  setup() {
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

    const weekdays = [
      "2020-12-14",
      "2020-12-15",
      "2020-12-16",
    ]

    const activeDay = ref("2020-12-15");

    return {
      activeDay,
      sortedVeg,
      user,
      weekdays,
    };
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
