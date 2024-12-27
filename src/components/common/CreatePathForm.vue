<template>
    <form class="createPathForm" @submit.prevent="handleSubmit">
        <FormItem
            title="Место отправления:"
            v-model:place="departurePlace"
            v-model:time="departureTime"
        />
        <FormStopItem
            v-for="(stop, index) in stops"
            :key="index"
            :index="index"
            :path-time="calculateTimeToStop(index)"
            :onDelete="deleteStop"
            v-model:place="stop.place"
            v-model:a_time="stop.arrivalTime"
            v-model:d_time="stop.departureTime"
        />
        <button class="createPathForm__button" type="button" @click="addStop">
            Добавить остановку
        </button>
        <FormItem title="Место прибытия:" v-model:place="arrivalPlace" v-model:time="arrivalTime" />
        <p>Общее время маршрута {{ totalTravelTime }}</p>
        <button class="createPathForm__button" type="submit">Создать маршрут</button>
    </form>
</template>
<script setup>
import { ref, computed } from 'vue'

import { usePathesStore } from '@/stores/usePathesStore'
import { useWindowStore } from '@/stores/useWindowStore'

import FormItem from '@/components/common/FormItem.vue'
import FormStopItem from '@/components/common/FormStopItem.vue'

import { timeToMinutes } from '@/constants/timeToMinutes'
import { formatTime } from '@/constants/formatTime'
import { PathItem } from '@/constants/classes/PathItem'
import { StopItem } from '@/constants/classes/StopItem'

const departurePlace = ref('')
const departureTime = ref('')

const arrivalPlace = ref('')
const arrivalTime = ref('')

const stops = ref([])

const pathesStore = usePathesStore()
const { addPath } = pathesStore

const windowStore = useWindowStore()
const { handleCreatePathFormOpen } = windowStore

const calculateTimeToStop = (stopIndex) => {
    let totalMinutes = 0

    if (stopIndex === 0) {
        totalMinutes = timeToMinutes(departureTime.value, stops.value[stopIndex].arrivalTime)
    } else {
        totalMinutes = timeToMinutes(
            stops.value[stopIndex - 1].departureTime,
            stops.value[stopIndex].arrivalTime,
        )
    }

    return formatTime(totalMinutes)
}

const totalTravelTime = computed(() => {
    let totalMinutes = 0

    if (departureTime.value && arrivalTime.value) {
        totalMinutes += timeToMinutes(departureTime.value, arrivalTime.value)
    }

    return formatTime(totalMinutes)
})

const addStop = () => {
    stops.value.push(new StopItem())
}

const deleteStop = (index) => {
    stops.value.splice(index, 1)
}

const handleSubmit = () => {
    addPath(
        new PathItem(
            departurePlace.value,
            departureTime.value,
            arrivalPlace.value,
            arrivalTime.value,
            totalTravelTime,
            stops.value,
        ),
    )
    handleCreatePathFormOpen()
}
</script>

<style scoped lang="scss">
.createPathForm {
    z-index: 2;
    margin-top: 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 30px;
    width: 100%;
    max-width: 400px;
    padding: 30px;

    @include p_normal_font;

    background-color: $main_1;
    border-radius: 30px;

    filter: drop-shadow(0 0 2px $main_2);

    @include v550 {
        @include p_small_font;

        border-radius: 20px;
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
}
</style>
