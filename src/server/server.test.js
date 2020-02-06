import WebSocket from "ws";
import { socketServer } from "./socket-server.js";
import { MESSAGE_TYPES } from "./messageHandlers/messageTypes.js";

describe("coolifier", () => {
  test("makes my cat cooler", () => {
    expect(true).toBe(true);
  });
});

describe("Websocket server tests", function() {
  let server = undefined;

  beforeEach(function(done) {
    server = socketServer({ port: 9001 });
    server.on("listening", done);
  });

  afterEach(function(done) {
    if (server) {
      console.log("@@@@@");
      server.close(done);
    }
  });

  it("Should receive the stock update", done => {
    const wsClient = new WebSocket("ws://localhost:9001/");

    wsClient.onopen = () => {
      console.log("Client connected");
    };

    wsClient.onmessage = message => {
      console.log("###");
      // expect(true).toBe(true);
      const parsed = JSON.parse(message.data);
      console.log(parsed.type === MESSAGE_TYPES.STOCK_UPDATE);
      expect(parsed.type).toEqual(MESSAGE_TYPES.STOCK_UPDATE);
      done();
    };
  });
});
