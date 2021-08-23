<template>

  <header>
    <router-link to="/log" class="icon1">
      ☰
    </router-link>

    <small>
      <router-link to="/">
        VEGHACKER 0.1 alpha
      </router-link>
    </small>

    <a href="/about" class="icon2">
      ☻
    </a>
  </header>

  <router-view />
</template>

<style scoped>
header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding: 1rem;
    text-align: center;
    justify-content: baseline;
    background-color: #124;
}

a {
    text-decoration: none;
}

.icon1 {
    font-size: 1.5em;
}

.icon2 {
    font-size: 2em;
}
</style>
