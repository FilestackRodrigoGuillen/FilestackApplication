'use strict'

var app = require("./app");
var port = 3900;

app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:"+port);
});

//const { Client } = require('pg');

/*const connectionData = {
 user: 'postgres',
 host: 'localhost',
 database: 'db_filestack',
 password: 'fermodyl5',
 port: 5432,
}
const client = new Client(connectionData)
client.connect();*/

/*client.connect()
client.query('SELECT * FROM table')∫
.then(response => {
     console.log(response.rows)
    client.end()
  })
  .catch(err => {
    client.end()
  })*/