import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import WebSocket from "ws";
import http from "http";

import messageUtils from "./messages";
import broadcast from "./broadcast";

const port = process.env.PORT || 8081;

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(morgan("common"));
app.use(helmet());

// keep track of all users that have connected (I want to store these in redis eventually)
// let users: any = {};
import users from "./users";

wss.on("connection", (ws) => {
  broadcast.sendTo(ws, { type: "connection", message: "Socket connected" });

  // TODO: Need to add channels for each whiteboard. Should be able to just the whiteboard ID
  // Might also need to implement redis or memcache for keep track of all connected users? for the meantime, sessions shouldn't be long enough that should be a problem; if it ever does becomes a problem
  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    // console.log(data);
    switch (data.type) {
      case "message": {
        messageUtils.messageResponse(ws, data);
        break;
      }
      case "connect": {
        messageUtils.connectResponse(wss, ws, data);
        break;
      }
      case "offer": {
        messageUtils.offerResponse(ws, data);
        break;
      }
      case "answer": {
        messageUtils.answerResponse(ws, data);
        break;
      }
      case "candidate": {
        messageUtils.candidateResponse(ws, data);
        break;
      }
      case "leave": {
        // @ts-ignore
        broadcast.sendToAll(wss, ws, { type: "leave", name: ws.name });
        break;
      }
      default: {
        broadcast.sendTo(ws, {
          type: "error",
          message: "An unknown error occured",
        });
        break;
      }
    }
  });

  ws.on("close", () => {
    // @ts-ignore
    delete users[ws.name];
    broadcast.sendToAll(wss, ws, {
      type: "leave",
      // @ts-ignore
      user: { id: ws.id, name: ws.name },
    });
  });
});

process.env.NODE_ENV !== "test" &&
  server.listen(port, () =>
    console.log(`Signalling server started on port ${port}`)
  );

export { server };
