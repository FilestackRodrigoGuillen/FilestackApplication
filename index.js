'use strict'

var http = require("http")
var app = require("./app");
var port = 3900;
const server =  http.createServer(app)
server.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:"+port);
});