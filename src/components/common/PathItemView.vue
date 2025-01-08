<template>
    <div class="pathItemView">
        <h1 class="pathItemView__title">Маршрут №: {{ props.path.id }}</h1>
        <div class="pathItemView__information">
            <p>{{ props.path.departurePlace }}</p>
            <p class="pathItemView__time">{{ props.path.totalTime }}</p>
            <p>{{ props.path.arrivalPlace }}</p>
        </div>
        <div v-if="props.path.stops.length > 0" class="pathItemView__container">
            <p>Остановки [{{ props.path.stops.length }}]:</p>
            <ul class="pathItemView__stops">
                <StopItemView
                    v-for="(stop, index) in props.path.stops"
                    :key="index"
                    :stop="stop"
                    :stop-time="calculateStopTime(stop)"
                    :path-time="calculateTimeToStop(props.path, index)"
                />
            </ul>
            <div class="pathItemView__warning">
                <p>* - указано время стоянки</p>
                <p>** - указано время в пути от начала и до 1-ой остановки или между остановками</p>
            </div>
        </div>
        <p v-else>Остановок на маршруте нет</p>
        <div class="pathItemView__buttons">
            <MainButton text="Редактировать" :is-big="false" :on-click="props.onOpen" />
            <MainButton text="Удалить" :is-big="false" :on-click="props.onDelete" />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

import StopItemView from '@/components/common/StopItemView.vue'
import MainButton from '@/components/common/MainButton.vue'

import { calculateStopTime } from '@/constants/calculateStopTime'
import { calculateTimeToStop } from '@/constants/calculateTimeToStop'

const props = defineProps({
    path: { type: Object, required: true },
    onOpen: {
        type: Function,
        default: () => console.log('Функция не передана'),
        required: true,
    },
    onDelete: {
        type: Function,
        default: () => console.log('Функция не передана'),
        required: true,
    },
})
</script>

<style lang="scss" scoped>
.pathItemView {
    z-index: 2;

    @include flex_column_center;
    gap: 15px;
    width: 100%;
    max-width: 750px;
    padding: 30px;

    @include p_normal_font;
    @include in_modal_background;

    &__title {
        align-self: flex-start;

        @include h2_font;

        @include v550 {
            @include p_big_font;
            font-weight: 700;
        }
    }

    &__information {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding-bottom: 10px;

        @include p_big_font;

        @include v550 {
            @include p_normal_font;
        }

        border-bottom: 2px solid $grey_3;
    }

    &__time {
        color: $grey_1;
    }

    &__container {
        width: 100%;
        max-width: 700px;
    }

    &__stops {
        display: flex;
        flex-direction: column;
        gap: 10px;

        & > li:not(:last-child) {
            padding-bottom: 10px;

            border-bottom: 1px solid $grey_3;
        }
    }

    &__warning {
        padding-top: 10px;

        @include p_small_font;
        word-break: normal;

        border-top: 2px solid $grey_3;
    }

    &__buttons {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 20px;
        width: 100%;
    }
}
</style>
