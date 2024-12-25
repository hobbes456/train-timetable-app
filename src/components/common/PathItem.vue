<template>
    <li class="pathItem">{{ props.text }}</li>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.pathItem {
    @include p_normal_font;
}
</style>
