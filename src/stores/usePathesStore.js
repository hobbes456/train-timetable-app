import { ref } from 'vue'
import { defineStore } from 'pinia'

import { PATHES } from '@/constants/localStorageKeys'

export const usePathesStore = defineStore('todo', () => {
    const pathes = ref(JSON.parse(localStorage.getItem(PATHES)) || [])

    const addPath = (item) => {
        pathes.value.unshift(item)
        saveToLocalStorage()
    }

    const updatePath = (index, newPath) => {
        pathes.value[index] = newPath
        saveToLocalStorage()
    }

    const deletePath = (index) => {
        pathes.value.splice(index, 1)
        saveToLocalStorage()
    }

    const saveToLocalStorage = () => {
        localStorage.setItem(PATHES, JSON.stringify(pathes.value))
    }

    return { pathes, addPath, updatePath, deletePath }
})
