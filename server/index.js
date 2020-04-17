const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const { sockets } = require('socket.io');
let rooms = 0;

const server = app.listen(port, () => {
  console.log('listening on port: ', port);
});

const io = require('socket.io')(server);

const games = {};

io.on('connection', (socket) => {
  socket.join('rooms');
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  socket.on('createGame', (data) => {
    const room = makeid(8);
    socket.join(room);
    socket.emit('newGame', { name: data.name, room, gameName: data.gameName });
    games[room] = { p1: data.name, gameName: data.gameName };
    console.log(games);
    io.in('rooms').emit('rooms', {
      room: room,
      p1: data.name,
      gameName: data.gameName
    });
    console.log('A', room)
  });
  socket.on('joinGame', function (data) {
    console.log('B', data.room)
    var room = io.nsps['/'].adapter.rooms[data.room];
    console.log(games);
    if (!games[data.room]) {
      socket.emit('err', { message: `Room doesn't exist yet! Create one first!` });
    }
    else if (room && room.length === 1) {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('player1', {});
      socket.emit('player2', { name: data.name, room: data.room, gameName: games[data.room].gameName });
      games[data.room]['p2'] = data.name ;
      io.in('rooms').emit('rooms', {
        room: data.room,
        p2: data.name,
      });
    } else {
      socket.emit('err', { message: 'Sorry, The room is full!' });
    }
  });
  socket.on('playTurn', (data) => {
    console.log('C', data.room)
    socket.broadcast.to(data.room).emit('turnPlayed', {
      tile: data.tile,
      room: data.room,
    });
    if (!games[data.room]['tiles']) games[data.room]['tiles'] = [];
    games[data.room]['tiles'].push(data.tile);
    console.log(games)
    io.in('rooms').emit('rooms', {
      room: data.room,
      tiles: games[data.room]['tiles'],
    });
  });
  socket.on('gameEnded', (data) => {
    console.log('D', data.room)
    socket.broadcast.to(data.room).emit('gameEnd', data);
    games[data.room]['endMessage'] = data.message ;
    io.in('rooms').emit('rooms', {
      room: data.room,
      endMessage: data.message,
    });
  });
  socket.on('rooms', () => {
    console.log('help', games)
    socket.emit('rooms', {
      games
    });
  });
});