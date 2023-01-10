class state {
    constructor(state,state_code){
        this.table = "states"
        this.data={
            state : state,
            state_code : state_code
        }
    }
}

module.exports = state;