<template>
    <div class="timeTable">
        <h1 class="timeTable__title">Маршуртный лист</h1>
        <ul class="timeTable__list">
            <PathItem v-for="item in pathItems" :key="item.id" :text="item" />
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import PathItem from './PathItem.vue'
// example
const pathItems = ref(['Путь 1', 'Путь 2', 'Путь 3', 'Путь 4'])
// example
</script>

<style lang="scss" scoped>
.timeTable {
    @include flex_column_center;
    row-gap: 30px;

    &__title {
        @include p_big_font;
    }

    &__list {
        @include flex_column_center;
        row-gap: 15px;
    }
}
</style>
