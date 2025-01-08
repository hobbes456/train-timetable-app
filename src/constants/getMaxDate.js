export const getMaxDate = () => {
    const maxDate = new Date()

    maxDate.setFullYear(maxDate.getFullYear() + 5)

    return maxDate.toISOString().split('T')[0]
}
