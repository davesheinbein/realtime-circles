var io = require('socket.io')();

io.on('connection', function(socket) {

  socket.on('add-circle', function(data) {
    io.emit('add-circle', data);
  });

  // Listen for other messages from clients below
  




});

module.exports = io;