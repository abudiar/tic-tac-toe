module.exports = {
  sockets(socket) {
    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
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
    });
    socket.on('joinGame', function (data) {
      var room = io.nsps['/'].adapter.rooms[data.room];
      if (room && room.length === 1) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('player1', {});
        socket.emit('player2', { name: data.name, room: data.room });
        games[room] = { p2: data.name };
      } else {
        socket.emit('err', { message: 'Sorry, The room is full!' });
      }
    });
    socket.on('playTurn', (data) => {
      socket.broadcast.to(data.room).emit('turnPlayed', {
        tile: data.tile,
        room: data.room,
      });
      games[room] = { tile: data.tile };
    });
    socket.on('gameEnded', (data) => {
      socket.broadcast.to(data.room).emit('gameEnd', data);
      games[room] = { endMessage: data.message };
    });
    socket.on('rooms', () => {
      socket.emit('rooms', games);
    });
  },
};
