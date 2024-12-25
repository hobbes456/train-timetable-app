<template>
    <div class="mainScreen">
        <MainButton text="Создать путь" :is-big="true" :on-click="handleClick" />
        <TimeTable />
        <ModalWindow v-if="showModal" title="Заполните форму" :on-close="handleChange" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

import MainButton from '@/components/common/MainButton.vue'
import TimeTable from '@/components/common/TimeTable.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'

const showModal = ref(false)

const handleChange = () => {
    showModal.value = !showModal.value
}

const handleClick = () => {
    console.log(1)
    handleChange()
}
</script>

<style scoped lang="scss">
.mainScreen {
    margin-top: 100px;

    @include flex_column_center;
    row-gap: 60px;
}
</style>
