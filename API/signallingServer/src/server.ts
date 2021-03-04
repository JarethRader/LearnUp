import express from "express";
import helmet from "helmet";
import WebSocket from "ws";
import http from "http";

import messageUtils from "./messages";

const port = process.env.PORT || 8081;

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(helmet());

// keep track of all users that have connected (I want to store these in redis eventually)
let users: any = {};

// send back to user
const sendTo = (connection: WebSocket, message: object) => {
  connection.send(JSON.stringify(message));
};

const sendToAll = (ws: WebSocket, message: object) => {
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

wss.on("connection", (ws) => {
  console.log("Socket connected");
  sendTo(ws, { type: "connection", message: "Socket connected" });

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    switch (data.type) {
      case "message": {
        messageUtils.messageResponse(ws as any, data);
        break;
      }
      case "connect": {
        messageUtils.connectResponse(wss, ws as any, data);
        break;
      }
      case "offer": {
        messageUtils.offerResponse(ws as any, data);
        break;
      }
      case "answer": {
        messageUtils.answerResponse(ws as any, data);
        break;
      }
      case "candidate": {
        messageUtils.candidateResponse(ws as any, data);
        break;
      }
      case "leave": {
        sendToAll(ws, { type: "leave" });
        break;
      }
      default: {
        sendTo(ws, { type: "error", message: "An unknown error occured" });
        break;
      }
    }
  });

  ws.on("close", () => {
    // @ts-ignore
    delete users[ws.name];
    // @ts-ignore
    sendToAll(ws, { type: "leave", user: { id: ws.id, name: ws.name } });
  });
});

server.listen(port, () =>
  console.log(`Signalling server started on port ${port}`)
);
