<template>
    <li class="pathItem" @click="handleOpen">
        <div class="pathItem__places">
            <p>{{ props.path.departurePlace }}</p>
            <p>{{ props.path.arrivalPlace }}</p>
        </div>
        <p>Кол-во остановок: {{ props.path.stops.length }}</p>
        <p>Время в пути: {{ props.path.totalTime }}</p>
    </li>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    path: {
        type: Object,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.pathItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 5px;
    align-items: center;
    width: 100%;
    max-width: 400px;

    padding: 15px;

    @include p_normal_font;

    border: 2px solid $grey_1;

    transition: background-color 0.2s ease-in-out;
    cursor: pointer;

    @include v550 {
        max-width: 280px;

        @include p_small_font;
    }

    &:hover {
        background-color: $green_1;
    }

    &:active {
        filter: opacity(0.7);
    }

    &__places {
        display: flex;
        justify-content: space-between;
        width: 100%;

        @include p_big_font;

        @include v550 {
            @include p_normal_font;
        }
    }
}
</style>
