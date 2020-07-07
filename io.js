var io = require('socket.io')();

const players = {};

io.on('connection', function(socket) {

  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });

  // Listen for other messages from clients below
  socket.on('clear-display', function() {
    io.emit('clear-display');
  });

  socket.on('register-player', function(initials) {
    players[socket.id] = initials;
    io.emit('update-player-list', Object.values(players));
  });
  
  socket.on('disconnect', function() {
    delete players[socket.id];
    io.emit('update-player-list', Object.values(players));
  });


});

module.exports = io;