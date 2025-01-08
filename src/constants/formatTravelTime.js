export const formatTravelTime = (ms) => {
    const travelTimeMinutes = Math.floor(ms / (1000 * 60))
    const travelTimeHours = Math.floor(travelTimeMinutes / 60)
    const travelTimeDays = Math.floor(travelTimeHours / 24)

    const remainingHours = travelTimeHours % 24
    const remainingMinutes = travelTimeMinutes % 60

    if (travelTimeDays > 0) {
        return `${travelTimeDays} д. ${remainingHours} ч. ${remainingMinutes} м.`
    } else {
        return `${remainingHours} ч. ${remainingMinutes} м.`
    }
}
