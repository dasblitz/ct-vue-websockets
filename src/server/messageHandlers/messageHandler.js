const { stringify } = JSON;

class MessageHandler {
  static sockets = [];

  constructor(socket) {
    MessageHandler.sockets.push(socket);
    this.send = this.send(socket);
  }

  send = socket => message => {
    socket.send(stringify(message));
  };

  sendAll = message => {
    MessageHandler.sockets.forEach(socket => {
      socket.send(stringify(message));
    });
  };
}

export { MessageHandler };
