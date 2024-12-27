export class PathItem {
    constructor(d_place = '', d_time = '', a_place = '', a_time = '', totalTime = '', stops = []) {
        this.d_place = d_place
        this.d_time = d_time
        this.a_place = a_place
        this.a_time = a_time
        this.totalTime = totalTime
        this.stops = [...stops]
    }
}
