<template>
    <header>
        <router-link to="/"> Veghacker v0.1-alpha </router-link>

        <nav>
            <a href="/about"> About </a>
            <router-link to="account"> Account </router-link>
        </nav>
    </header>

    <router-view />
</template>

<style scoped>
a {
    text-decoration: none;
    font-size: small;
}

header {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background-color: #124;
}
</style>
