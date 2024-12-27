<template>
    <div class="timeTable">
        <h1 class="timeTable__title">Маршруты</h1>
        <ul v-if="pathes.length > 0" class="timeTable__list">
            <PathItem
                v-for="(path, index) in pathes"
                :key="index"
                :path="path"
                @dblclick="deletePath(index)"
            />
        </ul>
        <p v-else class="timeTable__text">Маршрутов нет</p>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { usePathesStore } from '@/stores/usePathesStore'

import PathItem from './PathItem.vue'

const pathesStore = usePathesStore()

const { pathes } = storeToRefs(pathesStore)
const { deletePath } = pathesStore
</script>

<style lang="scss" scoped>
.timeTable {
    margin-bottom: 50px;

    @include flex_column_center;
    row-gap: 30px;

    &__title {
        @include p_big_font;
    }

    &__list {
        @include flex_column_center;
        row-gap: 15px;
    }

    &__text {
        @include p_normal_font;

        color: $red_1;
    }
}
</style>
