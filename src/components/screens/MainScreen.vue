<template>
    <div class="mainScreen">
        <MainButton text="Создать путь" :is-big="true" :on-click="handleClick" />
        <TimeTable />
        <ModalWindow v-if="showModal" title="Заполните форму" :on-close="handleClick">
            <CreatePathForm />
        </ModalWindow>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import MainButton from '@/components/common/MainButton.vue'
import TimeTable from '@/components/common/TimeTable.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import CreatePathForm from '@/components/common/CreatePathForm.vue'

const showModal = ref(false)

const handleClick = () => {
    showModal.value = !showModal.value
}
</script>

<style scoped lang="scss">
.mainScreen {
    margin-top: 100px;

    @include flex_column_center;
    row-gap: 60px;
}
</style>
