class user{
    constructor(name,age,email,phone,password,type,userid){
        this.table = "Users"
        this.data = {
            userid : userid,
            name : name,
            age : age,
            email : email,
            phone : phone,
            password : password,
            type : type
        }
    }
    
}

module.exports = user;