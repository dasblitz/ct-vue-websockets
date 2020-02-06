import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let inStock = 10;

wss.on("connection", ws => {
  //connection is up, let's add a simple simple event
  ws.on("message", message => {
    //log the received message and send it back to the client
    const { type } = JSON.parse(message);

    console.log("received: %s", type);
    if (type === "order_product") {
      inStock = Math.max(inStock - 1, 0);
      ws.send(JSON.stringify({ type: "stock_update", value: inStock }));
    } else {
      ws.send(
        JSON.stringify({ type: "error", value: `unknown message type ${type}` })
      );
    }
  });

  //send immediatly a feedback to the incoming connection
  const message = JSON.stringify({ type: "stock_update", value: inStock });
  ws.send(message);
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
