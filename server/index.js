const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const { sockets } = require('./socket');
let rooms = 0;

const server = app.listen(port, () => {
  console.log('listening on port: ', port);
});

const io = require('socket.io')(server);

io.on('connection', sockets);
