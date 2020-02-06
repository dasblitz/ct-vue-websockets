import express from "express";
import http from "http";

import { socketServer } from "./socket-server.js";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

const httpServer = http.createServer(app);

socketServer({ server: httpServer });

//start our server
httpServer.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${httpServer.address().port} :)`);
});
