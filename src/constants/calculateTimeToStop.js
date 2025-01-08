import { formatTravelTime } from './formatTravelTime'

export const calculateTimeToStop = (formData, stopIndex) => {
    const { stops, departureDate, departureTime } = formData
    const { arrivalDate: arrivalStopDate, arrivalTime: arrivalStopTime } = stops[stopIndex]

    if (!departureDate || !departureTime || !arrivalStopDate || !arrivalStopTime) return false

    const departureDateTime = new Date(`${departureDate}T${departureTime}`)

    const arrivalStopDateTime = new Date(`${arrivalStopDate}T${arrivalStopTime}`)

    const previousDepartureDateTime =
        stopIndex === 0
            ? departureDateTime
            : new Date(
                  `${stops[stopIndex - 1].departureDate}T${stops[stopIndex - 1].departureTime}`,
              )

    if (previousDepartureDateTime.getTime() >= arrivalStopDateTime.getTime()) return false

    const travelToStopTimeMs = arrivalStopDateTime - previousDepartureDateTime

    return formatTravelTime(travelToStopTimeMs)
}
