module.exports = {
  sockets(socket) {
    function makeid(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const games = {};
    socket.on('createGame', (data) => {
      const room = makeid(8);
      socket.join(room);
      socket.emit('newGame', { name: data.name, room });
      games[room] = { p1: data.name };
      socket.broadcast.to('rooms').emit({
        room,
        p1: data.name,
      });
    });
    socket.on('joinGame', function (data) {
      var room = io.nsps['/'].adapter.rooms[data.room];
      if (room && room.length === 1) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('player1', {});
        socket.emit('player2', { name: data.name, room: data.room });
        games[data.room] = { p2: data.name };
        socket.broadcast.to('rooms').emit({
          room,
          p2: data.name,
        });
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
      socket.broadcast.to('rooms').emit({
        room,
        tiles: games[data.room]['tiles'],
      });
    });
    socket.on('gameEnded', (data) => {
      socket.broadcast.to(data.room).emit('gameEnd', data);
      games[data.room] = { endMessage: data.message };
      socket.broadcast.to('rooms').emit({
        room,
        endMessage: data.message,
      });
    });
    socket.on('rooms', () => {
      socket.emit('rooms', games);
    });
  },
};
