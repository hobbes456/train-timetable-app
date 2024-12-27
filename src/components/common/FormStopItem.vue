<template>
    <div class="formItem">
        <div class="formItem__tools">
            <label :for="'place' + props.index">Остановка №{{ props.index + 1 }}:</label>
            <button class="formItem__button" type="button" @click="handleDelete(index)">Х</button>
        </div>
        <div class="formItem__inputs">
            <input
                class="formItem__field"
                type="text"
                :id="'place' + index"
                v-model="place"
                required
            />
            <input class="formItem__field" type="time" v-model="a_time" required />
            <input class="formItem__field" type="time" v-model="d_time" required />
        </div>
        <p>Время в пути: {{ props.pathTime }}</p>
    </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const props = defineProps({
    index: Number,
    pathTime: String,
    onDelete: {
        type: Function,
        required: true,
    },
})

const place = defineModel('place')
const a_time = defineModel('a_time')
const d_time = defineModel('d_time')

const handleDelete = (index) => {
    props.onDelete(index)
}
</script>

<style lang="scss" scoped>
.formItem {
    @include form_item;
}
</style>
