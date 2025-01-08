export class StopItem {
    constructor(
        place = '',
        arrivalTime = '',
        arrivalDate = '',
        departureTime = '',
        departureDate = '',
    ) {
        ;(this.place = place),
            (this.arrivalTime = arrivalTime),
            (this.arrivalDate = arrivalDate),
            (this.departureTime = departureTime),
            (this.departureDate = departureDate)
    }
}
