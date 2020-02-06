export default function createWebSocketPlugin(socket) {
  return store => {
    socket.onopen = function() {
      store.dispatch("socketConnected");
    };
    socket.onmessage = message => {
      // Would setup a way to send this to all modules in a real app
      store.dispatch("products/socketReceived", JSON.parse(message.data));
    };
    store.subscribe(mutation => {
      if (mutation.type.indexOf("/socketSend") > -1) {
        socket.send(JSON.stringify(mutation.payload));
      }
    });
  };
}
