export const parseDateTime = (date, time) => {
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time.split(':').map(Number)

    return new Date(year, month - 1, day, hours, minutes)
}
