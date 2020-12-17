<template>
  <a href="/">VEGHACKER v0.1-alpha</a>

  <UserGreeting v-model:username="user.name" />

  <h2>
      What veg did you eat {{ activeDay }}?
  </h2>

  <VegWeekdays v-model:active="activeDay" :weekdays="weekdays" :log="log" />

  <VegChecklist v-model:log="log[activeDay]" :activeDay="activeDay" :vegetables="sortedVeg" />
</template>

<script lang="ts">
import UserGreeting from "./components/UserGreeting.vue"
import VegChecklist from "./components/VegChecklist.vue"
import VegWeekdays from "./components/VegWeekdays.vue"
import { computed, reactive, ref, watch } from "vue"
import { vegetables } from "./main"
import { Veg } from './types'

export default {
  name: "App",
  components: {
    UserGreeting,
    VegWeekdays,
    VegChecklist,
  },
  setup() {
    const sortedVeg = computed(() => {
      return vegetables.sort(function (a: Veg, b: Veg) {
        if (a.code < b.code) return -1
        if (a.code > b.code) return 1
        return 0;
      });
    });

    const localUser = JSON.parse(localStorage.getItem("user"))
    const localLog = JSON.parse(localStorage.getItem("log"))

    const codesToVeg = (codes: String[]) => codes.map((code) => {
      return vegetables.filter(veg => veg.code === code)[0]
    })

    const user = reactive(
      localUser || {
        name: "Veghacker" + Math.round(100 + 900 * Math.random())
      }
    );

    function dataToLog(data) {
      const log = {}

      if (data) {
        Object.entries(data).forEach(([key, value]: any) => {
          console.log(codesToVeg(value))
          log[key] = codesToVeg(value)
        })
      }

      return log
    }

    const log = reactive(
      dataToLog(localLog)
    )

    const vegToCodes = (veggies: Veg[]) => {
      return veggies.map((veg) => veg.code)
    }
    
    const logData = computed(() => {
      const data = {}

      Object.entries(log).forEach(([key, value]: any) => {
        data[key] = vegToCodes(value)
      });

      return data
    })

    watch(user, () => localStorage.setItem("user", JSON.stringify(user)))
    watch(logData, () => localStorage.setItem("log", JSON.stringify(logData.value)))

    function createDays(start: Date): String[] {
      const days = []
      let date = start

      do {
        days.push(date.toISOString().split("T")[0])
        date.setDate(date.getDate() + 1)
      }
      while (date <= new Date())

      return days
    }

    const weekdays = createDays(new Date("2020-12-14"))

    const activeDay = ref()

    return {
      activeDay,
      sortedVeg,
      user,
      log,
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
