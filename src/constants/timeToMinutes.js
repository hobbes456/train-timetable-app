export const timeToMinutes = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    return endHour * 60 + endMinute - (startHour * 60 + startMinute)
}
