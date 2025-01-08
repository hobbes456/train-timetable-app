import { validatePlaceLenght } from './validatePlaceLength'
import { parseDateTime } from './parseDateTime'

import {
    MIN_MAX_LENGHT_PLACE_ERROR,
    DATE_SEQUENCE_ERROR,
    MIN_MAX_LENGHT_STOP_PLACE_ERROR,
    FIRST_STOP_ARRIVAL_DATE_ERROR,
    LAST_STOP_DEPARTURE_DATE_ERROR,
    STOP_DATE_SEQUENCE_ERROR,
} from './validateErrorMessages'

export const validateForm = (form, error) => {
    const {
        departurePlace,
        departureDate,
        departureTime,
        stops,
        arrivalPlace,
        arrivalDate,
        arrivalTime,
    } = form

    error.value = ''

    if (!departurePlace || !validatePlaceLenght(departurePlace)) {
        error.value = MIN_MAX_LENGHT_PLACE_ERROR

        return false
    }

    if (!arrivalPlace || !validatePlaceLenght(arrivalPlace)) {
        error.value = MIN_MAX_LENGHT_PLACE_ERROR

        return false
    }

    const departureDateTime = parseDateTime(departureDate, departureTime)
    const arrivalDateTime = parseDateTime(arrivalDate, arrivalTime)

    if (departureDateTime >= arrivalDateTime) {
        error.value = DATE_SEQUENCE_ERROR

        return false
    }

    if (stops.length > 0) {
        const firstStop = stops[0]
        const firstStopArrivalDateTime = parseDateTime(firstStop.arrivalDate, firstStop.arrivalTime)

        if (departureDateTime >= firstStopArrivalDateTime) {
            error.value = `${FIRST_STOP_ARRIVAL_DATE_ERROR} "${firstStop.place}"`

            return false
        }

        const lastStop = stops[stops.length - 1]
        const lastStopDepartureDateTime = parseDateTime(
            lastStop.departureDate,
            lastStop.departureTime,
        )

        if (lastStopDepartureDateTime >= arrivalDateTime) {
            error.value = LAST_STOP_DEPARTURE_DATE_ERROR
            return false
        }

        for (const stop of stops) {
            if (!stop.place || !validatePlaceLenght(stop.place)) {
                error.value = MIN_MAX_LENGHT_STOP_PLACE_ERROR

                return false
            }

            const stopArrivalDateTime = parseDateTime(stop.arrivalDate, stop.arrivalTime)
            const stopDepartureDateTime = parseDateTime(stop.departureDate, stop.departureTime)

            if (stopArrivalDateTime >= stopDepartureDateTime) {
                error.value = `Остановка "${stop.place}": ${STOP_DATE_SEQUENCE_ERROR}`

                return false
            }

            if (stops.indexOf(stop) > 0) {
                const previousStop = stops[stops.indexOf(stop) - 1]

                const previousStopDepartureDateTime = parseDateTime(
                    previousStop.departureDate,
                    previousStop.departureTime,
                )

                if (stopArrivalDateTime <= previousStopDepartureDateTime) {
                    error.value = `Остановки "${previousStop.place}" - "${stop.place}": ${DATE_SEQUENCE_ERROR}`
                    return false
                }
            }
        }
    }

    return true
}
