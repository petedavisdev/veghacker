<template>
	<header>
		<router-link to="log">
			<span>VEG</span><span>HAC</span><span>KER</span>
			0.1-alpha
		</router-link>

		<router-link to="account" class="fl-r">😀</router-link>

		<a href="/guide" class="fl-r">📖</a>
	</header>
</template>

<style scoped>
header {
	position: sticky;
	top: 0;
	left: 0;
	right: 0;
	background-color: #124;
	padding: 1rem;
}

span {
	color: yellowgreen;
	font-weight: bold;
}
span:first-of-type {
	color: yellow;
}
span:last-of-type {
	color: limegreen;
}
</style>