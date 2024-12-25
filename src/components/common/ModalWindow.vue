<template>
    <div class="modalWindow">
        <div @click="props.onClose" class="modalWindow__field" />
        <div class="modalWindow__content">
            <h1 class="modalWindow__title">{{ props.title }}</h1>
            <slot />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: 'Модальное окно',
    },
    onClose: {
        type: Function,
        default: () => console.log('Функция не передана'),
    },
})
</script>

<style lang="scss" scoped>
.modalWindow {
    position: fixed;
    top: 10%;
    right: 0;
    left: 0;

    display: block;
    padding: 20px;

    &__field {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: $black;

        filter: opacity(0.7);
    }

    &__content {
        @include flex_column_center;
    }

    &__title {
        z-index: 2;
        padding-bottom: 20px;

        @include h1_font;

        color: $white;
        text-align: center;

        @include v550 {
            padding-bottom: 10px;

            @include p_big_font;
        }
    }
}
</style>
