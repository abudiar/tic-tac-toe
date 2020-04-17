module.exports = function (server) {
  const io = require('socket.io')(server);

  const games = {};

  io.on('connection', (socket) => {
    socket.join('rooms');
    function makeid(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    socket.on('createGame', (data) => {
      const room = makeid(8);
      socket.join(room);
      socket.emit('newGame', { name: data.name, room, gameName: data.gameName });
      games[room] = { p1Name: data.name, gameName: data.gameName };
      io.in('rooms').emit('rooms', { room, ...games[room] });
    });
    socket.on('joinGame', function (data) {
      var room = io.nsps['/'].adapter.rooms[data.room];
      if (!games[data.room]) {
        socket.emit('err', { message: `Room doesn't exist yet! Create one first!` });
      } else if (room && room.length === 1) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('player1', { name: data.name });
        socket.emit('player2', {
          name: games[data.room].p1Name,
          room: data.room,
          gameName: games[data.room].gameName,
        });
        games[data.room]['p2Name'] = data.name;
        games[data.room]['status'] = 'running';
        io.in('rooms').emit('rooms', { room: data.room, ...games[data.room] });
      } else {
        socket.emit('err', { message: 'Sorry, The room is full!' });
      }
    });
    socket.on('playTurn', (data) => {
      socket.broadcast.to(data.room).emit('turnPlayed', {
        tile: data.tile,
        room: data.room,
      });
      if (!games[data.room]['tiles']) games[data.room]['tiles'] = [];
      games[data.room]['tiles'].push(data.tile);
      io.in('rooms').emit('rooms', { room: data.room, ...games[data.room] });
    });
    socket.on('gameEnded', (data) => {
      socket.broadcast.to(data.room).emit('gameEnd', data);
      if (data.winner) games[data.room]['winner'] = data.winner;
      if (data.status) games[data.room]['status'] = data.status;
      io.in('rooms').emit('rooms', {
        room: data.room,
        winner: data.winner,
      });
    });
    socket.on('rooms', () => {
      if (Object.keys(games).length > 0)
        socket.emit('rooms', {
          games,
        });
    });
  });
};
