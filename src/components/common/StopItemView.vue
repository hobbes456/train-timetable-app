<template>
    <li class="stopItemView">
        <p class="stopItemView__place">{{ props.stop.place }}</p>
        <p class="stopItemView__time">{{ props.stopTime }}*</p>
        <p class="stopItemView__time">{{ props.pathTime }}**</p>
        <div class="stopItemView__container">
            <p>Приб.:</p>
            <p>{{ props.stop.arrivalDate }}</p>
            <p>{{ props.stop.arrivalTime }}</p>
        </div>
        <div class="stopItemView__container">
            <p>Отпр.:</p>
            <p>{{ props.stop.departureDate }}</p>
            <p>{{ props.stop.departureTime }}</p>
        </div>
    </li>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    stop: { type: Object, required: true },
    pathTime: { type: String, required: true },
    stopTime: { type: String, required: true },
})
</script>

<style lang="scss" scoped>
.stopItemView {
    display: flex;
    align-items: center;
    gap: 15px;

    @include p_small_font;

    & > .stopItemView__place,
    .stopItemView__time,
    .stopItemView__container {
        width: 20%;
        text-align: center;
    }

    &__place {
        @include p_normal_font;
        text-decoration: underline;
        word-break: normal;

        @include v550 {
            @include p_small_font;
        }
    }

    &__time {
        color: $grey_1;
    }
}
</style>
