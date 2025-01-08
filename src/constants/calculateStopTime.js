import { formatTravelTime } from './formatTravelTime'

export const calculateStopTime = (stopData) => {
    const { arrivalDate, arrivalTime, departureDate, departureTime } = stopData

    if (!departureDate || !departureTime || !arrivalDate || !arrivalTime) return false

    const departureDateTime = new Date(`${departureDate}T${departureTime}`)

    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`)

    if (arrivalDateTime.getTime() >= departureDateTime.getTime()) return false

    const travelToStopTimeMs = departureDateTime - arrivalDateTime

    return formatTravelTime(travelToStopTimeMs)
}
