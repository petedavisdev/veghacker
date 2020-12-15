<template>
    <span>
        {{ code }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        colorLight: String,
        code: String
    }
})
</script>

<style scoped>

span {
    color: v-bind(colorLight)
}

</style>