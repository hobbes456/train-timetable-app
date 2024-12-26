<template>
    <form class="createPathForm" @submit.prevent="handleSubmit">
        <div class="createPathForm__item">
            <label for="departurePlace">Место отправления:</label>
            <div class="createPathForm__inputs">
                <input
                    class="createPathForm__field"
                    type="text"
                    id="departurePlace"
                    v-model="departurePlace"
                    required
                />
                <input
                    class="createPathForm__field"
                    type="time"
                    id="departureTime"
                    v-model="departureTime"
                    required
                />
            </div>
        </div>
        <div v-for="(stop, index) in stops" :key="index" class="createPathForm__item">
            <div>
                <label :for="'place' + index">Остановка №{{ index + 1 }}:</label>
                <button type="button" @click="removeStop(index)">Х</button>
            </div>
            <div class="createPathForm__inputs">
                <input
                    class="createPathForm__field"
                    type="text"
                    :id="'place' + index"
                    v-model="stop.place"
                    required
                />
                <input
                    class="createPathForm__field"
                    type="time"
                    v-model="stop.arrivalTime"
                    required
                />
                <input
                    class="createPathForm__field"
                    type="time"
                    v-model="stop.departureTime"
                    required
                />
            </div>
            <p>Время в пути: {{ calculateTimeToStop(index) }}</p>
        </div>
        <button type="button" @click="addStop">Добавить остановку</button>
        <div class="createPathForm__item">
            <label for="arrivalPlace">Место прибытия:</label>
            <div class="createPathForm__inputs">
                <input
                    class="createPathForm__field"
                    type="text"
                    id="arrivalPlace"
                    v-model="arrivalPlace"
                    required
                />
                <input
                    class="createPathForm__field"
                    type="time"
                    id="arrivalTime"
                    v-model="arrivalTime"
                    required
                />
            </div>
        </div>
        <p>Общее время маршрута {{ totalTravelTime }}</p>
        <button type="submit">Создать маршрут</button>
    </form>
</template>
<script setup>
import { ref, computed } from 'vue'

import { timeToMinutes } from '@/constants/timeToMinutes'
import { formatTime } from '@/constants/formatTime'

const departurePlace = ref('')
const departureTime = ref('')

const arrivalPlace = ref('')
const arrivalTime = ref('')

const stops = ref([])

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

    return totalMinutes ? formatTime(totalMinutes) : '(требуется расчет)'
}

const totalTravelTime = computed(() => {
    let totalMinutes = 0

    if (departureTime.value && arrivalTime.value) {
        totalMinutes += timeToMinutes(departureTime.value, arrivalTime.value)
    }

    return formatTime(totalMinutes)
})

const addStop = () => {
    stops.value.push({ place: '', arrivalTime: '', departureTime: '' })
}

const removeStop = (index) => {
    stops.value.splice(index, 1)
}

const handleSubmit = () => {}
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

    &__item {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    &__inputs {
        display: flex;
        gap: 10px;
    }

    &__field {
        padding: 10px;

        background-color: $white;

        border: 1px solid $grey_3;
        border-radius: 10px;

        transition: background-color 0.3s ease-in-out;

        &:hover {
            background-color: $grey_4;
        }

        & > label {
            cursor: pointer;
        }
    }
}
</style>
