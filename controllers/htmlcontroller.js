'use strict'

var path = require("path");

var controller = {
    returnlogin:(req,res) => {
        return res.status(200).sendFile(path.resolve(__dirname,'../public/templates/login.html'));
    },
    returnsignup:(req,res) => {
        return res.status(200).sendFile(path.resolve(__dirname,'../public/templates/signup.html'));
    },
    returncompany:(req,res) => {
        return res.status(200).sendFile(path.resolve(__dirname,'../public/templates/company.html'));
    },
    returnworker:(requ,res) => {
        return res.status(200).sendFile(path.resolve(__dirname,'../public/templates/worker.html'));
    },
    returnhtml:(req,res) => {
        return res.status(200).sendFile(path.resolve(__dirname,'../public/templates/html.html'));
    },
}

module.exports = controller;