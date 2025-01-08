export class PathItem {
    constructor(formDate, totalTravelTime) {
        this.id = Date.now()
        this.departurePlace = formDate.departurePlace
        this.departureDate = formDate.departureDate
        this.departureTime = formDate.departureTime

        this.stops = [...formDate.stops]

        this.arrivalPlace = formDate.arrivalPlace
        this.arrivalDate = formDate.arrivalDate
        this.arrivalTime = formDate.arrivalTime

        this.totalTime = totalTravelTime
    }
}
