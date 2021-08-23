<template>
  <header>
    <nav>
        <router-link to="/log" class="icon1">
          ☰
        </router-link>

        <strong>
          <router-link to="/">
            VEGHACKER 0.1-alpha
          </router-link>
        </strong>

        <a href="/about" class="icon2">
          ☻
        </a>
    </nav>

    <slot />
  </header>
</template>

<style scoped>
header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    background-color: #124;
}

nav {
    display: grid;
    grid-template-columns: auto 1fr auto;
    text-align: center;
    padding: 1ch 1rem;
}

a {
    text-decoration: none;
}

.icon1 {
    transform: scale(1.5);
}

.icon2 {
    transform: scale(2);
}

strong {
    font-family: "Ubuntu Mono", monospace;
}
</style>