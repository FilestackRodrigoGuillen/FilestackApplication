class city{
    constructor(city,state_code){
        this.table = "cities"
        this.body = {
            state_code : state_code,
            city : city
        }
    }
}

module.exports = city