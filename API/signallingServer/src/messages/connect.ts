const buildConnectResponse = (
  users: any,
  uuidv4: () => string,
  sendTo: (connection: wsType, message: object) => void,
  sendToAll: (wss: wssType, ws: wsType, message: object) => void
) => {
  const connectResponse = (
    wsServer: wssType,
    websocket: wsType,
    data: ConnectData
  ) => {
    if (users[data.name]) {
      sendTo(websocket, {
        type: "connect",
        success: false,
        message: "User has already connected",
      });
    } else {
      const id = `conn-${uuidv4()}`;
      let loggedIn: { id: string; name: string }[] = [];
      Object.values(users).map((user) => {
        const exists = {
          // @ts-ignore
          id: user.id,
          // @ts-ignore
          name: user.name,
        };
        loggedIn = [...loggedIn, exists];
      });
      users[data.name] = websocket;
      // @ts-ignore
      websocket.name = data.name;
      // @ts-ignore
      websocket.id = id;
      sendTo(websocket, {
        type: "connect",
        success: true,
        users: loggedIn,
      });
      sendToAll(wsServer, websocket, {
        type: "updateUsers",
        // @ts-ignore
        user: { id: websocket.id, name: websocket.name },
      });
    }
  };
  return connectResponse;
};

export default buildConnectResponse;
