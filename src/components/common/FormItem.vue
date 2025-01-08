<template>
    <div class="formItem">
        <label class="formItem__title" :for="props.title">{{ props.title }}</label>
        <div class="formItem__inputs">
            <input
                class="formItem__input"
                type="text"
                :id="props.title"
                v-model.trim="place"
                required
            />
            <input
                class="formItem__input"
                type="date"
                v-model.trim="date"
                :min="getMinDate()"
                :max="getMaxDate()"
                required
            />
            <input class="formItem__input" type="time" v-model.trim="time" required />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

import { getMinDate } from '@/constants/getMinDate'
import { getMaxDate } from '@/constants/getMaxDate'

const props = defineProps({
    title: { type: String, required: true },
})

const place = defineModel('place')
const date = defineModel('date')
const time = defineModel('time')
</script>

<style lang="scss" scoped>
.formItem {
    @include flex_column_center;
    row-gap: 10px;
    width: 100%;

    &__title {
        align-self: flex-start;

        @include p_big_font;

        cursor: pointer;

        @include v550 {
            @include p_normal_font;
        }
    }

    &__inputs {
        display: flex;
        gap: 10px;

        @include v550 {
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__input {
        @include input_field;
    }
}
</style>
