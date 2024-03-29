//MODULES
var express = require('express');
var bodyParser = require('body-parser');


//EXECUTE EXPRESS
var app = express();

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var path = require("path");

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ROUTES
var routes = require("./routes/routes.js");
const { type } = require('os');
app.use('/',routes);

//DEFINE STATIC FILES
app.use(express.static(path.join(__dirname,"public"),{
    type: 'module'
  }))

//EXPORT MODULE
module.exports = app;