import WebSocket from "ws";

const broadcast = Object.freeze({
  sendTo: (connection: WebSocket, message: object) => {
    connection.send(JSON.stringify(message));
  },
  sendToAll: (wss: WebSocket.Server, websocket: WebSocket, message: object) => {
    wss.clients.forEach((client) => {
      if (
        client !== websocket &&
        client.readyState === WebSocket.OPEN &&
        // @ts-ignore
        client.room === websocket.room
      ) {
        console.log(message);
        client.send(JSON.stringify(message));
      }
    });
  },
});

export default broadcast;
