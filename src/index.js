import http from "http";
import express from "express";
// import { db } from "./db/db.js";
import { createUser, getAllUsers } from "./queries.js";
import { attachWebSocketServer } from "./ws/server.js";

const PORT = 4051;

const app = express();

app.use(express.json());
/* ---------------- HTTP Server ---------------- */

const server = http.createServer(app)
app.get("/users",getAllUsers);
app.post("/users",createUser);
 
const { broadCastStarted }  = attachWebSocketServer(server);


server.listen(PORT, () => {
  console.log(`Websocket is runing on: ${PORT}/ws`)
  console.log(`Server listening on port ${PORT}`);
});
