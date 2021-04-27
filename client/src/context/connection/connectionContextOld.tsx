import React from "react";
import { v4 as uuidv4 } from "uuid";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

// use for local connections
// const configuration = null;

const reducer = (
  state: ConnectionState,
  action: ConnectionAction
): ConnectionState => {
  switch (action.type) {
    case "SET_CONNECTION":
      return {
        ...state,
        connection: action.payload,
      };
    case "SET_CHANNEL":
      return {
        ...state,
        channel: action.payload,
      };
    case "CLEAR_CONNECTION":
      return {
        ...state,
        connection: null,
      };
    case "CLEAR_CHANNEL":
      return {
        ...state,
        channel: null,
      };
    case "SEND_MSG":
      return {
        ...state,
        message: action.payload,
      };
    case "CLEAR_MSG":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};

const initialState: ConnectionState = {
  uid: uuidv4(),
  connection: null,
  channel: null,
  message: null,
};

const ConnectionContext = React.createContext<
  { state: ConnectionState; dispatch: ConnectionDispatch } | undefined
>(undefined);

type TServerMessage = {
  type: string;
  message: string;
};

const ConnectionProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [connecting, setConnecting] = React.useState(false);
  const [connectedTo, setConnectedTo] = React.useState("");
  const webSocket = React.useRef<WebSocket | null>(null);
  const [socketMessages, setSocketMessages] = React.useState<TServerMessage[]>(
    []
  );
  const connectedRef = React.useRef<string>();
  const messagesRef = React.useRef({});
  const [messages, setMessages] = React.useState({});
  const [users, setUsers] = React.useState<any[]>([]);

  // function to send request to signalling server
  const send = (data: any) => {
    // @ts-ignore
    webSocket.current.send(JSON.stringify(data));
  };

  const connectWebSocket = async () => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        webSocket.current = await new WebSocket("ws://127.0.0.1:8081/");
        // TODO: I'll need to change this ws URL eventually for production
        webSocket.current.onmessage = (message: any) => {
          const data = JSON.parse(message.data);
          setSocketMessages((prev) => [...prev, data]);
        };
        webSocket.current.onclose = () => {
          // @ts-ignore
          webSocket.current.close();
        };

        webSocket.current.onopen = () => {
          resolve(true);
        };
      } catch (err) {
        reject(false);
      }
    });
  };

  React.useEffect(() => {
    connectWebSocket()
      .then((success) => {
        handleConnect();
      })
      .catch((err) => {
        console.log("websocket failed to connect: ", err);
      });

    // TODO: cleanup doesnt run on chrome, but it does in firefox? I need to handle users leaving and remove them on the signaling server
    const cleanup = () => {
      // @ts-ignore
      webSocket.current.close();
      send({
        type: "leave",
        name: state.uid,
      });
    };

    window.addEventListener("beforeunload", cleanup);

    return () => window.addEventListener("beforeunload", cleanup);
  }, []);

  // handle messages we get from the signalling server
  React.useEffect(() => {
    let data = socketMessages.pop();
    console.log("Data", data);
    if (data) {
      switch (data.type) {
        case "connect":
          onConnect(data);
          break;
        case "offer":
          onOffer(data);
          break;
        case "answer":
          onAnswer(data);
          break;
        case "candidate":
          onCandidate(data);
          break;
        case "updateUsers":
          updateUsers(data);
          break;
        case "removeUser":
          removeUser(data);
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const handleMessageRecieved = (data: any) => {
    // @ts-ignore
    const user = messages.user;
    const messages = messagesRef.current;
    // @ts-ignore
    let userMessages = messages[user];
    if (userMessages) {
      userMessages = [...userMessages, data];
      const newMessages = Object.assign({}, messages, { [user]: userMessages });
      messagesRef.current = newMessages;
      setMessages(newMessages);
    } else {
      const newMessages = Object.assign({}, messages, [{ [user]: [data] }]);
      messagesRef.current = newMessages;
      setMessages(newMessages);
    }
  };

  const updateUsers = (data: any) => {
    toggleConnection(data.user.name);
    setUsers((prev) => [...prev, data.user]);
  };

  const removeUser = (data: any) => {
    setUsers((prev) => prev.filter((user) => user.name !== data.user.name));
  };

  const onConnect = (data: any) => {
    if (data.success) {
      setUsers(data.users);
      createLocalConnection();
    } else {
      console.log("Failed to connect to signalling server");
    }
  };

  const createLocalConnection = () => {
    const localConnection = new RTCPeerConnection(configuration);
    // setUsers, should include current and any connecting users
    localConnection.onicecandidate = (connection) => {
      const connectedTo = connectedRef.current;
      if (connection.candidate && !!connectedTo && users.length > 0) {
        send({
          name: connectedTo,
          type: "candidate",
          candidate: connection.candidate.candidate,
        });
      }
    };

    localConnection.ondatachannel = (event) => {
      const recieveChannel = event.channel;
      recieveChannel.onopen = () => {
        console.log("Data cannel is open and ready to be used");
      };
      recieveChannel.onmessage = handleMessageRecieved;
      dispatch({
        type: "SET_CHANNEL",
        payload: recieveChannel,
      });
    };
    dispatch({
      type: "SET_CONNECTION",
      payload: localConnection,
    });
  };

  const onOffer = (data: any) => {
    setConnectedTo(data.name);
    connectedRef.current = data.name;

    if (state.connection) {
      state.connection
        .setRemoteDescription(new RTCSessionDescription(data.offer))
        .then(() => state.connection!.createAnswer())
        .then((answer) => state.connection!.setLocalDescription(answer))
        .then(() =>
          send({
            type: "answer",
            answer: state.connection!.localDescription,
            name: data.name,
          })
        )
        .catch((err) => console.log(err));
    } else {
      createLocalConnection();
      onOffer(data);
    }
  };

  const onAnswer = (data: any) => {
    if (state.connection) {
      state.connection.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    } else {
      createLocalConnection();
      onAnswer(data);
    }
  };

  const onCandidate = (data: any) => {
    if (state.connection) {
      state.connection.addIceCandidate(new RTCIceCandidate(data.candidate));
    } else {
      createLocalConnection();
      onCandidate(data);
    }
  };

  const handleConnect = () => {
    send({
      type: "connect",
      name: state.uid,
    });
  };

  const handleCreateConnection = (name: string) => {
    if (state.connection) {
      const dataChannel = state.connection.createDataChannel("messanger");
      dataChannel.onerror = (err: any) => {
        console.log(err);
      };

      dataChannel.onmessage = handleMessageRecieved;
      dispatch({
        type: "SET_CHANNEL",
        payload: dataChannel,
      });

      users.length > 0 &&
        state
          .connection!.createOffer()
          .then((offer) => state.connection!.setLocalDescription(offer))
          .then(() =>
            send({
              type: "offer",
              offer: state.connection!.localDescription,
              name: name,
            })
          )
          .catch((err) => console.log(err));
    } else {
      createLocalConnection();
      handleCreateConnection(name);
    }
  };

  const toggleConnection = (user: string) => {
    if (connectedRef.current === user) {
      setConnecting(true);
      setConnectedTo("");
      connectedRef.current = "";
      setConnecting(false);
    } else {
      setConnecting(true);
      setConnectedTo(user);
      connectedRef.current = user;
      handleCreateConnection(user);
      setConnecting(false);
    }
  };

  React.useEffect(() => {
    if (state.message !== null && state.channel?.readyState === "open") {
      console.log("Sending message", state.message);
      state.channel.send(JSON.stringify(state.message));

      dispatch({
        type: "CLEAR_MSG",
        payload: null,
      });
    }
  }, [state.message]);

  const value = { state, dispatch };
  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};

function useConnection() {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a Layout Provider");
  }
  return context;
}

export { ConnectionProvider, useConnection };
