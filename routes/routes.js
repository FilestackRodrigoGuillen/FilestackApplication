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


module.exports = routes;