class worker_offer{
    constructor(workeroffer_id,joboffer_id,worker_id,curriculum,video,photo){
        this.table = "WorkerOffers",
        this.data = {
            workeroffer_id:workeroffer_id,
            joboffer_id:joboffer_id,
            worker_id:worker_id,
            curriculum:curriculum,
            video:video,
            photo:photo
        }
        
    }
}

module.exports = worker_offer;