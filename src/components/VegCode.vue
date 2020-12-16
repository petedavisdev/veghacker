<template>
    <span>
        {{ code }}
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    props: {
        colorLight: String,
        code: String
    },
    setup(props) {
        const color = computed(() => props.colorLight || "LimeGreen")

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