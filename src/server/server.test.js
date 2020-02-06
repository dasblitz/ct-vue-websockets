import WebSocket from "ws";
import { socketServer } from "./socket-server.js";
import { MESSAGE_TYPES } from "./messageHandlers/messageTypes.js";

describe("Websocket server tests", function() {
  let server = undefined;

  beforeEach(function(done) {
    console.log("Start server");
    server = socketServer({ port: 9001 });
    server.on("listening", done);
  });

  afterEach(function(done) {
    if (server) {
      console.log("Close server");
      server.close(done);
    }
  });

  it("Should receive the stock update", done => {
    const wsClient = new WebSocket("ws://localhost:9001/");

    wsClient.onmessage = message => {
      const parsed = JSON.parse(message.data);
      expect(parsed.type).toEqual(MESSAGE_TYPES.STOCK_UPDATE);
      done();
    };
  });
});
