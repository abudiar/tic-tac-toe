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

    socket.on('createGame', (data) => {
      const number = makeid(8);
      socket.join(number);
      socket.emit('newGame', { name: data.name, room: number });
    });

    socket.on('joinGame', function (data) {
      var room = io.nsps['/'].adapter.rooms[data.room];
      if (room && room.length === 1) {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('player1', {});
        socket.emit('player2', { name: data.name, room: data.room });
      } else {
        socket.emit('err', { message: 'Sorry, The room is full!' });
      }
    });

    socket.on('playTurn', (data) => {
      socket.broadcast.to(data.room).emit('turnPlayed', {
        tile: data.tile,
        room: data.room,
      });
    });

    socket.on('gameEnded', (data) => {
      socket.broadcast.to(data.room).emit('gameEnd', data);
    });
  },
};
