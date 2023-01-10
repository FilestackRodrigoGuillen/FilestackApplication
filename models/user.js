class user{
    constructor(name,state,city, age,email,phone,password,type,userid){
        this.table = "Users"
        this.data = {
            userid : userid,
            name : name,
            age : age,
            email : email,
            phone : phone,
            password : password,
            type : type,
            state : state,
            city : city
        }
    }
    
}

module.exports = user;