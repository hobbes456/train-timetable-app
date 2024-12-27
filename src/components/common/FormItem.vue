<template>
    <div class="formItem">
        <label :for="props.title">{{ props.title }}</label>
        <div class="formItem__inputs">
            <input class="formItem__field" type="text" :id="props.title" v-model="place" required />
            <input class="formItem__field" type="time" v-model="time" required />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

const props = defineProps({
    title: String,
})

const place = defineModel('place')
const time = defineModel('time')
</script>

<style lang="scss" scoped>
.formItem {
    @include form_item;
}
</style>
