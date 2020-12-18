<template>
  <header>
    <router-link to="/">
      VEGHACKER v0.2-alpha
    </router-link>

    <nav>
      <router-link to="/">
        Today
      </router-link>

      &mdash;
      
      <router-link to="/log">
        Days
      </router-link>

      &mdash;

      <router-link to="/weeks">
        Weeks
      </router-link>
    </nav>
  </header>

  <router-view />
</template>

<style scoped>
a {
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
}
</style>
