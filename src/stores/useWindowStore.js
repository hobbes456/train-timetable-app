import { ref } from 'vue'
import { defineStore } from 'pinia'

import { CREATE_PATH_FORM_OPEN } from '@/constants/localStorageKeys'

export const useWindowStore = defineStore('window', () => {
    const isCreatePathFormOpen = ref(
        JSON.parse(localStorage.getItem(CREATE_PATH_FORM_OPEN)) || false,
    )

    const handleCreatePathFormOpen = () => {
        isCreatePathFormOpen.value = !isCreatePathFormOpen.value
        saveToLocalStorage()
    }

    const saveToLocalStorage = () => {
        localStorage.setItem(CREATE_PATH_FORM_OPEN, JSON.stringify(isCreatePathFormOpen.value))
    }

    return { isCreatePathFormOpen, handleCreatePathFormOpen }
})
