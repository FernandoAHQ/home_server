

const express = require('express');
const path = require('path');
require('dotenv').config();
// App de Express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');
 



// Path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use( express.json() ); 
app.use( '/api/network', require('./routes/network.routes') );



server.listen( process.env.PORT, (err) => {
    
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto ', process.env.PORT);

})