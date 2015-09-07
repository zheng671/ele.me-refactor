// export function for listening to the socket
module.exports = function (socket) {

  // broadcast a user's message to other users
  socket.on('store:statuschange', function (data) {
    socket.broadcast.emit('test', {
      id: data.id,
      status: data.status
    });
  });
};