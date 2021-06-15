<template>
    <span>
        <slot />
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        color: String,
    },
    setup(props) {
        const color = computed(() => props.color || "LimeGreen")
        
        return {
            color,
        }
    }
})
</script>

<style scoped>
span {
    color: v-bind(color)
}
</style>