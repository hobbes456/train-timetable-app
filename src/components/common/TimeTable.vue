<template>
    <div class="timeTable">
        <h1 class="timeTable__title">Маршруты</h1>
        <ul v-if="pathes.length > 0" class="timeTable__list">
            <PathItem
                v-for="(path, index) in pathes"
                :key="index"
                :path="path"
                @click="handleModalOpen(path, index)"
            />
        </ul>
        <p v-else class="timeTable__text">Маршрутов нет</p>
        <ModalWindow v-if="isModalOpen" title="Просмотр маршрута" :on-close="handleModalClose">
            <CreatePathForm
                v-if="isFormOpen"
                :form-data="pathes[selectedIndex]"
                :index="selectedIndex"
                :on-close="() => handleFormClose()"
            />
            <PathItemView
                v-else
                :path="pathes[selectedIndex]"
                :on-open="() => handleFormOpen()"
                :on-delete="() => handleDelete(selectedIndex)"
            />
        </ModalWindow>
    </div>
</template>

<script setup>
import { ref } from 'vue'

import { usePathesStore } from '@/stores/usePathesStore'

import PathItem from '@/components/common/PathItem.vue'
import ModalWindow from '@/components/common/ModalWindow.vue'
import PathItemView from '@/components/common/PathItemView.vue'
import CreatePathForm from '@/components/common/CreatePathForm.vue'

const pathesStore = usePathesStore()

const { pathes, deletePath } = pathesStore

const isModalOpen = ref(false)
const isFormOpen = ref(false)
const selectedPath = ref(null)
const selectedIndex = ref(null)

const handleModalOpen = (path, index) => {
    isModalOpen.value = true
    selectedPath.value = path
    selectedIndex.value = index
}

const handleModalClose = () => {
    isModalOpen.value = false
    selectedPath.value = null
    selectedIndex.value = null
    handleFormClose()
}

const handleFormOpen = () => (isFormOpen.value = true)
const handleFormClose = () => {
    isFormOpen.value = false
}

const handleDelete = (index) => {
    deletePath(index)
    handleModalClose()
}
</script>

<style lang="scss" scoped>
.timeTable {
    margin-bottom: 50px;

    @include flex_column_center;
    row-gap: 30px;

    &__title {
        @include p_big_font;

        @include v550 {
            @include p_normal_font;
        }
    }

    &__list {
        @include flex_column_center;
        row-gap: 15px;
    }

    &__text {
        @include p_normal_font;
        color: $red_1;

        @include v550 {
            @include p_small_font;
        }
    }
}
</style>
