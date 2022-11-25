'use strict'

var express = require('express');
var htmlcontroller = require("../controllers/htmlcontroller");
var databasecontroller = require("../controllers/databasecontroller");
var routes = express.Router();

routes.get("/login",htmlcontroller.returnlogin);
routes.get("/signup",htmlcontroller.returnsignup);
routes.post("/signupuser",databasecontroller.registeruser);
routes.get("/company",htmlcontroller.returncompany);

module.exports = routes;