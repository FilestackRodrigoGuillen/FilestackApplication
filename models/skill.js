class skill{
    constructor(name,type,joboffer_id,skill_id){
        this.table = "Skills"
        this.data = {
            skill_id : skill_id,
            type : type,
            name : name,
            joboffer_id : joboffer_id,
        }
    }
}

module.exports = skill;