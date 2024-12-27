<template>
    <li class="pathItem">
        <div class="pathItem__places">
            <p>{{ props.path.d_place }}</p>
            <p>{{ props.path.a_place }}</p>
        </div>
        <p>Кол-во остановок: {{ props.path.stops.length || 0 }}</p>
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
    max-width: 350px;

    padding: 15px;

    @include p_normal_font;

    border: 2px solid $grey_1;

    transition: background-color 0.2s ease-in-out;
    cursor: pointer;

    @include v550 {
        max-width: 280px;
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
    }
}
</style>
