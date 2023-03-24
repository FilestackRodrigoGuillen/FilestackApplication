'use strict'

var express = require('express');
var htmlcontroller = require("../controllers/htmlcontroller");
var databasecontroller = require("../controllers/databasecontroller");
const { Router } = require('express');
var routes = express.Router();

routes.get("/login",htmlcontroller.returnlogin);
routes.get("/signup",htmlcontroller.returnsignup);
routes.post("/signupuser",databasecontroller.registeruser);
routes.get("/company",htmlcontroller.returncompany);
routes.get("/worker",htmlcontroller.returnworker);
routes.post("/insertoffer",databasecontroller.insertoffer);
routes.post("/getoffers",databasecontroller.getjoboffers);
routes.post("/getskills",databasecontroller.getskills);
routes.get("/getstates",databasecontroller.getStates);
routes.get("/getcities",databasecontroller.getcities);
routes.post("/userlogin",databasecontroller.login);
routes.post("/updateuser",databasecontroller.updateuser);
routes.post("/updatewoffers",databasecontroller.updatewoffers);
routes.post("/virusdetection",databasecontroller.virusscan);
routes.get("/getworkeroffercardsinfo",databasecontroller.getworkeroffercardsinfo);
routes.get("/security",databasecontroller.getSecurityParams);

module.exports = routes;