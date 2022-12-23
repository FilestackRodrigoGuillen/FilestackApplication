class skill{
    constructor(joboffer_id,name,description,type,skill_id) {
        this.table = "Skills"
        this.data = {
            skill_id : skill_id,
            joboffer_id : joboffer_id,
            name : name,
            description : description,
            type : type
        }
    }
}

exports.module = skill;