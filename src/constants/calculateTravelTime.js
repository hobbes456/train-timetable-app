import { formatTravelTime } from './formatTravelTime'

export const calculateTravelTime = (formData) => {
    const { departureDate, departureTime, arrivalDate, arrivalTime } = formData

    if (!departureDate || !departureTime || !arrivalDate || !arrivalTime) return false

    const departureDateTime = new Date(`${departureDate}T${departureTime}`)
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`)

    if (departureDateTime.getTime() >= arrivalDateTime.getTime()) return false

    const travelTimeMs = arrivalDateTime - departureDateTime

    return formatTravelTime(travelTimeMs)
}
