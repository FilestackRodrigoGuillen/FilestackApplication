'use strict'
var database = require("../utils/database");
var userModel = require("../models/user");
const { response } = require("express");


var controller = {
    registeruser :(req,res) => {
        var connection = new database();
        connection.connect();
        let user = new userModel();
        console.log(req.body);
        user.data.name = req.body.name;
        user.data.age = req.body.age;
        user.data.email = req.body.email;
        user.data.password = req.body.password;
        user.data.type = req.body.type;
        user.data.phone = req.body.phone;
        var response = connection.insert(user).then((result) => {
            return res.status(200).send(result);
        });
        //connection.update(user,"name","user_id");
        //database.create();
        
    },
}

module.exports = controller;