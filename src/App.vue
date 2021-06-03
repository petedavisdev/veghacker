<template>
  <header>
    <router-link to="/">
      Veghacker v0.1-alpha
    </router-link>

    <nav>
      <a href="/about.html">
        About
      </a>
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
