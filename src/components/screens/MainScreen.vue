<template>
    <div class="mainScreen">
        <MainButton text="Создать путь" :is-big="true" :on-click="handleOpen" />
        <TimeTable />
        <ModalWindow v-if="isCreatePathFormOpen" title="Заполните форму" :on-close="handleOpen">
            <CreatePathForm />
        </ModalWindow>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useWindowStore } from '@/stores/useWindowStore'

import MainButton from '@/components/common/MainButton.vue'
import TimeTable from '@/components/common/TimeTable.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import CreatePathForm from '@/components/common/CreatePathForm.vue'

const windowStore = useWindowStore()

const { isCreatePathFormOpen } = storeToRefs(windowStore)
const { handleCreatePathFormOpen } = windowStore

const handleOpen = () => handleCreatePathFormOpen()
</script>

<style scoped lang="scss">
.mainScreen {
    margin-top: 100px;

    @include flex_column_center;
    row-gap: 60px;
}
</style>
