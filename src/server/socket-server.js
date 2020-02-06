import WebSocket from "ws";

import { ProductHandler } from "./messageHandlers/productHandler.js";

export const socketServer = function(options) {
  const wss = new WebSocket.Server(options);

  wss.on("connection", ws => {
    new ProductHandler(ws);
  });

  return wss;
};
