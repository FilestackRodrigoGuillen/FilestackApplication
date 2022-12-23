class job_offer{
    constructor(name,salary,description,type,state,city,joboffer_id){
        this.table = "JobOffers"
        this.data = {
            joboffer_id : joboffer_id,
            name : name,
            salary : salary,
            description : description,
            type : type,
            state : state,
            city : city
        }
    }
}

module.exports = job_offer;