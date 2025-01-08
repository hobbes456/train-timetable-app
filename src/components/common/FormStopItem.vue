<template>
    <div class="formItem">
        <div class="formItem__tools">
            <label class="formItem__title" :for="'place' + props.index"
                >Остановка №{{ props.index + 1 }}:</label
            >
            <button class="formItem__button" type="button" @click="handleDelete(index)">Х</button>
        </div>
        <div class="formItem__inputs">
            <input
                class="formItem__input"
                type="text"
                :id="'place' + index"
                v-model.trim="place"
                required
            />
            <div class="formItem__field">
                <p>Прибытие:</p>
                <input
                    class="formItem__input"
                    type="date"
                    v-model.trim="a_date"
                    :min="getMinDate()"
                    :max="getMaxDate()"
                    required
                />
                <input class="formItem__input" type="time" v-model.trim="a_time" required />
            </div>
            <div class="formItem__field">
                <p>Отправление:</p>
                <input
                    class="formItem__input"
                    type="date"
                    v-model.trim="d_date"
                    :min="getMinDate()"
                    :max="getMaxDate()"
                    required
                />
                <input class="formItem__input" type="time" v-model.trim="d_time" required />
            </div>
        </div>
        <p v-if="props.pathTime">Время в пути: {{ props.pathTime }}</p>
        <p v-if="props.stopTime">Время стоянки: {{ props.stopTime }}</p>
    </div>
</template>

<script setup>
import { defineProps, defineModel } from 'vue'

import { getMinDate } from '@/constants/getMinDate'
import { getMaxDate } from '@/constants/getMaxDate'

const props = defineProps({
    index: Number,
    pathTime: { type: [String, Boolean], required: true, default: false },
    stopTime: { type: [String, Boolean], required: true, default: false },
    onDelete: {
        type: Function,
        required: true,
        default: () => console.log('Функция не передана'),
    },
})

const place = defineModel('place')
const a_date = defineModel('a_date')
const a_time = defineModel('a_time')
const d_date = defineModel('d_date')
const d_time = defineModel('d_time')

const handleDelete = (index) => {
    props.onDelete(index)
}
</script>

<style lang="scss" scoped>
.formItem {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-bottom: 5px;

    border-bottom: 2px solid $grey_3;

    &__tools {
        display: flex;
        justify-content: space-between;
    }

    &__title {
        @include p_big_font;

        cursor: pointer;

        @include v550 {
            @include p_normal_font;
        }
    }

    &__button {
        color: $grey_1;

        transition: color 0.1s ease-in-out;

        &:hover {
            color: $red_1;
        }

        &:active {
            color: $grey_2;
        }
    }

    &__inputs {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    &__input {
        @include input_field;
    }

    &__field {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
    }
}
</style>
