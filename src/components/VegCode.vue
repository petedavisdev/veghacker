<template>
    <span>
        <slot />
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
    props: {
        color: String,
    },
    setup(props) {
        const color = computed(() => props.color || "LimeGreen");

        return {
            color,
        };
    },
});
</script>

<style scoped>
span {
    display: inline-block;
    font-family: "Ubuntu Mono", monospace;
    color: v-bind(color);
    font-weight: bold;
}
</style>