class database{
    constructor(){
        let connectionData = {
            user: 'postgres',
            host: 'localhost',
            database: 'db_filestack',
            password: 'fermodyl5',
            port: 5432,
        };
        const { Client } = require('pg');
        this.client = new Client(connectionData);
    }

    connect(){
        this.client.connect();
    }

    disconnect(){
        this.client.end();
    }

    //SELECTALL OBJECT
    select(object,where){
        console.log(object);
        let query = 'SELECT * FROM "'+object.table+'" '+where;
        console.log(query);
        return this.client.query(query).then(result => {
            if(result){
                console.log("success");
                return {result}
            }else{
                console.log("error");
                return {status: "fail", message: "Data not inserted into Database"}
            }
        });
    }


    //INSERT OBJECT
    insert(object){
        console.log(object);
        let keys = this.createkeys(Object.keys(object.data),Object.values(object.data));
        console.log(keys);
        let values = this.createvalues(Object.keys(object.data),Object.values(object.data));
        console.log(values);
        let query = 'INSERT INTO "'+object.table+'" (';
        for (let key of keys){
            query += key+',';
        }
        query = query.slice(0,-1);
        query += ') VALUES (';
        for (let value of values){
            if(typeof value === 'string'){
                if(value.includes("'")){
                    let index = value.indexOf("'");
                    value = value.substring(0, index) +
                    "'" +
                    value.substring(index);
                }
                query += "'"+value+"',";
            }else{
                query += value+',';
            }
        }
        
        query = query.slice(0,-1);
        query += ') RETURNING *'
        console.log(query);
        return this.client.query(query).then(result => {
            if(result){
                console.log("success");
                console.log(result);
                return {status: "success", message: "Data Inserted into Database",result}
            }else{
                console.log("error");
                return {status: "fail", message: "Data not inserted into Database"}
            }
        });
        //return this.client.query(query).then({status: "success", message: "Data Inserted into Database"};
    }

    //UPDATE OBJECT
    update(object, objkey, id){
        console.log(object);
        let keys = this.createkeys(Object.keys(object.data),Object.values(object.data));
        let values = this.createvalues(Object.keys(object.data),Object.values(object.data));
        let query = 'UPDATE "'+object.table+'" SET ';
        for(let i=0; i<keys.length; i++){
            if(objkey != keys[i] && id != keys[i]){
                query += keys[i] + " = ";
                if(typeof values[i] === 'string'){
                    query += "'"+values[i]+"',"
                }else{
                    query += values[i]+","
                }
            }
        }
        query = query.slice(0,-1);
        query += " WHERE "+objkey+" = ";
        if(typeof object.data[objkey] === 'string'){
            query += "'"+object.data[objkey]+"'";
        }else{
            query += object.data[objkey];
        }
        console.log(query);
        return this.client.query(query).then(result => {
            if(result){
                console.log("success");
                console.log(result);
                return {status: "success", message: "Data Inserted into Database",result}
            }else{
                console.log("error");
                return {status: "fail", message: "Data not inserted into Database"}
            }
        });
    }
    

    //DELETE OBJECT
    delete(object,key){
        let query = 'DELETE FROM "'+object.table+'" WHERE '+key+" = ";
        if(typeof object.data[key] === 'string'){
            query += "'"+object.data[key]+"'";
        }else{
            query += object.data[key];
        }
        console.log(query);
        this.client.query(query).then(result => {
            if(result){
                console.log("Dato eliminado");
            }else{
                console.log("ERROR");
            }
        })
    }

    ////////GENERTATE VALID ARRAYS///////////////
    createkeys(keys,values){
        let newkeys = [];
        for(let i= 0; i< keys.length; i++){
            if(typeof values[i] !== 'undefined'){
                newkeys.push(keys[i]);
            }
        }
        return newkeys;
    }

    createvalues(keys,values){
        let newval = [];
        for(let i= 0; i< keys.length; i++){
            if(typeof values[i] !== 'undefined'){
                newval.push(values[i]);
            }
        }
        return newval;
    }
    
}
module.exports = database;