<template>
    <button @click="props.onClick" class="mainButton" :class="mainButtonSize">
        {{ props.text }}
    </button>
</template>

<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    isBig: {
        type: Boolean,
        required: true,
    },
    onClick: {
        type: Function,
        default: () => console.log('Функция не передана'),
        required: true,
    },
})

const mainButtonSize = computed(() => {
    return `mainButton_${props.isBig ? 'big' : 'small'}`
})
</script>

<style scoped lang="scss">
.mainButton {
    display: block;

    @include p_normal_font;
    color: $grey_1;
    letter-spacing: 2px;

    border: 2px solid $grey_1;

    transition:
        background-color 100ms ease-in-out,
        color 100ms ease-in-out,
        border-color 100ms ease-in-out;

    @include v550 {
        @include p_small_font;
    }

    &:hover {
        background-color: $white;
    }

    &:active {
        color: $grey_2;
        border-color: $grey_2;
        background-color: $grey_4;
    }

    &_big {
        width: 200px;
        height: 40px;
    }

    &_small {
        width: 100%;
        max-width: 170px;
        height: 30px;
    }
}
</style>
