<template>
    <form class="createPathForm" @submit.prevent="onSubmit">
        <FormItem
            title="Место отправления:"
            v-model:place="form.departurePlace"
            v-model:date="form.departureDate"
            v-model:time="form.departureTime"
        />
        <FormStopItem
            v-for="(stop, index) in form.stops"
            :key="index"
            :index="index"
            :path-time="calculateTimeToStop(form, index)"
            :stop-time="calculateStopTime(stop)"
            :onDelete="deleteStop"
            v-model:place="stop.place"
            v-model:a_date="stop.arrivalDate"
            v-model:a_time="stop.arrivalTime"
            v-model:d_date="stop.departureDate"
            v-model:d_time="stop.departureTime"
        />
        <button class="createPathForm__button" type="button" @click="addStop">
            Добавить остановку
        </button>
        <FormItem
            title="Место прибытия:"
            v-model:place="form.arrivalPlace"
            v-model:date="form.arrivalDate"
            v-model:time="form.arrivalTime"
        />
        <p v-if="totalTravelTime">Общее время маршрута: {{ totalTravelTime }}</p>
        <p v-if="error" class="createPathForm__error">{{ error }}</p>
        <button class="createPathForm__button" type="submit">
            {{ props.formData ? 'Сохранить' : 'Создать' }} маршрут
        </button>
    </form>
</template>
<script setup>
import { defineProps, ref, computed } from 'vue'

import { usePathesStore } from '@/stores/usePathesStore'
import { useWindowStore } from '@/stores/useWindowStore'

import FormItem from '@/components/common/FormItem.vue'
import FormStopItem from '@/components/common/FormStopItem.vue'

import { validateForm } from '@/constants/validateForm'
import { calculateTravelTime } from '@/constants/calculateTravelTime'
import { calculateStopTime } from '@/constants/calculateStopTime'
import { calculateTimeToStop } from '@/constants/calculateTimeToStop'
import { PathItem } from '@/constants/classes/PathItem'
import { StopItem } from '@/constants/classes/StopItem'

const props = defineProps({
    formData: {
        type: Object,
        default: () => null,
    },
    index: {
        type: Number,
    },
    onClose: {
        type: Function,
        default: () => console.log('Функция не передана'),
    },
})

const defaultForm = ref({
    departurePlace: '',
    departureDate: '',
    departureTime: '',

    stops: [],

    arrivalPlace: '',
    arrivalDate: '',
    arrivalTime: '',
})

const form = ref(props.formData ? JSON.parse(JSON.stringify(props.formData)) : defaultForm.value)
const error = ref('')

const pathesStore = usePathesStore()
const { addPath, updatePath } = pathesStore

const windowStore = useWindowStore()
const { handleCreatePathFormOpen } = windowStore

const totalTravelTime = computed(() => calculateTravelTime(form.value))

const addStop = () => {
    form.value.stops.push(new StopItem())
}

const deleteStop = (index) => {
    form.value.stops.splice(index, 1)
}

const onSubmit = () => {
    if (validateForm(form.value, error)) {
        if (props.formData) {
            updatePath(props.index, new PathItem(form.value, totalTravelTime))
            props.onClose()
        } else {
            addPath(new PathItem(form.value, totalTravelTime))
            handleCreatePathFormOpen()
        }
    }
}
</script>

<style scoped lang="scss">
.createPathForm {
    z-index: 2;
    margin-top: 20px;

    @include flex_column_center;
    gap: 30px;
    width: 100%;
    max-width: 500px;
    padding: 30px;

    @include p_normal_font;

    @include in_modal_background;

    @include v550 {
        max-width: 300px;
        gap: 15px;
        padding: 15px;

        @include p_small_font;
    }

    &__button {
        color: $grey_2;

        transition: color 0.1s ease-in-out;

        &:hover {
            color: $black;
        }

        &:active {
            color: $grey_3;
        }
    }

    &__error {
        @include p_small_font;
        text-align: center;
        color: $red_1;
        word-break: normal;
    }
}
</style>
