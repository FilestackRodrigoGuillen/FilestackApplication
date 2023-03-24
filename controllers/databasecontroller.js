'use strict'
var database = require("../utils/database");
var userModel = require("../models/user");
var offerModel = require("../models/job_offer");
var skillModel = require("../models/skill");
var stateModel = require("../models/state");
var cityModel = require("../models/city");
const { response } = require("express");
const city = require("../models/city");
var workerOfferModel = require("../models/worker_offer");
var security = require("../utils/security");


var controller = {
    registeruser :(req,res) => {
        var connection = new database();
        connection.connect();
        let user = new userModel();
        user.data.name = req.body.name;
        user.data.age = req.body.age;
        user.data.email = req.body.email;
        user.data.password = req.body.password;
        user.data.type = req.body.type;
        user.data.phone = req.body.phone;
        var response = connection.insert(user).then((result) => {
            connection.disconnect();
            return res.status(200).send(result);
        });
    },
    insertoffer :(req,res) => {
        var connection = new database();
        connection.connect();
        let offer =  new offerModel();
        offer.data.name = req.body.jobname;
        offer.data.salary = parseInt(req.body.jobsalary);
        offer.data.description = req.body.jobdescription;
        offer.data.type = req.body.jobtype;
        var response = connection.insert(offer).then((result) => {
            var row = result.result.rows[0];
            for(let i in req.body.mandatoryskills){
                var skill = new skillModel();
                var name = req.body.mandatoryskills[i];
                skill.data.joboffer_id = row.joboffer_id,
                skill.data.name = name
                skill.data.type = 'm';
                console.log(skill);
                connection.insert(skill);
            }
            for(let i in req.body.mandatoryskills){
                var skill = new skillModel();
                var name = req.body.softskills[i];
                skill.data.joboffer_id = row.joboffer_id,
                skill.data.name = name
                skill.data.type = 's';
                connection.insert(skill);
            }
            return res.status(200).send(result);
        });
    },
    getjoboffers : (req,res) => {
        var connection = new database();
        connection.connect();
        let offer = new offerModel();
        var response = connection.select(offer,"WHERE type='r'").then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },
    getskills : (req,res) => {
        var offerid = req.body.joboffer_id;
        var connection = new database();
        connection.connect();
        let skill = new skillModel();
        var response = connection.select(skill,"WHERE joboffer_id='"+offerid+"'").then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },
    getStates : (req,res) => {
        var connection = new database();
        connection.connect();
        let state = new stateModel();
        var response = connection.select(state).then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },
    getcities : (req,res) => {
        var connection = new database();
        connection.connect();
        let city = new cityModel();
        var response = connection.select(city, " WHERE state_code = '"+req.query.state_code+"'").then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },
    login : (req,res) => {
        var connection = new database();
        connection.connect();
        let user = new userModel();
        var response = connection.select(user, " WHERE email='"+req.body.email+"' and password='"+req.body.password+"'").then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },
    updateuser : (req,res) => {
        console.log(req.body);
        var connection = new database();
        connection.connect();
        let user = new userModel();
        user.data.name = req.body.name;
        user.data.age = req.body.age;
        user.data.email = req.body.email;
        user.data.type = req.body.type;
        user.data.phone = req.body.phone;
        user.data.state = req.body.state;
        user.data.city = req.body.city;
        user.data.curriculum = req.body.curriculum;
        user.data.userid = parseInt(req.body.id);
        var id = parseInt(req.body.id);
        console.log(user);
        
        var response = connection.update(user,"userid",id).then(result =>{
            console.log(result);
        });
        return res.status(200).send({ok:"ok"});
    },
    virusscan: (req,res) => {
        console.log("VIRUS SCANNER");
        console.log(res);
    },
    updatewoffers:(req,res) => {
        console.log(req.body.curriculum);
        console.log(req.body.video);
        console.log(req.body.photo);
        let workerOffer = new workerOfferModel()
        workerOffer.data.worker_id = parseInt(req.body.worker_id);
        workerOffer.data.joboffer_id = parseInt(req.body.joboffer_id);
        var connection = new database();
        connection.connect();
        var response = connection.select(workerOffer,"WHERE joboffer_id="+workerOffer.data.joboffer_id+" and worker_id="+workerOffer.data.worker_id ).then(result =>{
            console.log(result.result.rows);
            if(result.result.rows.length>0){
                console.log(result.result.rows);
                if(req.body.curriculum !== undefined){
                    console.log("curriculum");
                    workerOffer.data.curriculum = req.body.curriculum
                }else if(req.body.video !== undefined){
                    console.log("video");
                    workerOffer.data.video = req.body.video
                }else if(req.body.photo !== undefined){
                    console.log("photo");
                    workerOffer.data.photo = req.body.photo
                }
                workerOffer.data.workeroffer_id = result.result.rows[0].workeroffer_id;
                connection.update(workerOffer,"workeroffer_id",workerOffer.data.workeroffer_id).then(result => {
                    return res.status(200).send({"response":"Already Inserted"});
                });
            }else{
                console.log("VACIO");
                workerOffer.data.curriculum = req.body.curriculum
                var response =  connection.insert(workerOffer).then(result =>{
                    return res.status(200).send({"response":"Already Inserted"});
                });
            }
            
        });
    },

    getworkeroffercardsinfo:(req,res) =>{
        var connection = new database();
        connection.connect();
        let workeroffer = new workerOfferModel();
        var response = connection.select(workeroffer, ' JOIN "Users" ON "WorkerOffers"."worker_id" = "Users"."userid"').then(result =>{
            return res.status(200).send(result.result.rows);
        });
    },

    getSecurityParams:(req,res) =>{
        var sec = new security();
        var clientOptions = sec.generatesecurity();
        console.log(clientOptions);
        return res.status(200).send(clientOptions);
    }
}

module.exports = controller;