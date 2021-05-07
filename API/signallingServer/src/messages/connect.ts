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
      let loggedIn: IUser[] = [];
      Object.values(users as IUser[]).map((user: IUser) => {
        const exists = {
          // @ts-ignore
          id: user.id,
          // @ts-ignore
          name: user.name,
          // @ts-ignore
          room: user.room,
        };
        if (user.room === data.room) {
          loggedIn = [...loggedIn, exists];
        }
      });
      users[data.name] = websocket;
      // @ts-ignore
      websocket.name = data.name;
      // @ts-ignore
      websocket.id = id;
      // @ts-ignore
      websocket.room = data.room;
      sendTo(websocket, {
        type: "connect",
        success: true,
        users: loggedIn,
      });
      // @ts-ignore
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
