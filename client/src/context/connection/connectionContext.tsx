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
    default:
      return state;
  }
};

const initialState: ConnectionState = {
  uid: uuidv4(),
  connection: null,
  channel: null,
};

const ConnectionContext = React.createContext<
  { state: ConnectionState; dispatch: ConnectionDispatch } | undefined
>(undefined);

type TServerMessage = {
  type: string;
  msg: string;
};

const ConnectionProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // const webSocket = new WebSocket("ws://localhost:8081");
  const webSocket = React.useRef<WebSocket | null>(null);
  const [socketOpen, setSocketOpen] = React.useState(false);
  const [socketMessages, setSocketMessages] = React.useState<TServerMessage[]>(
    []
  );

  // function to send request to signalling server
  const send = (data: any) => {
    console.log("sending message");
    // @ts-ignore
    webSocket.current.send(JSON.stringify(data));
  };

  const connectWebSocket = async () => {
    return new Promise<boolean>(async (resolve, reject) => {
      console.log("Connection to websocket");
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
          console.log(webSocket.current?.readyState);
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
        console.log(err);
        console.log("websocket failed to connect");
      });

    // @ts-ignore
    return () => webSocket.current.close();
  }, []);

  // handle messages we get from the signalling server
  React.useEffect(() => {
    let data = socketMessages.pop();
    if (data) {
      switch (data.type) {
        case "connect":
          onConnect(data);
          break;
        case "offer":
          // onOffer(data)
          break;
        case "answer":
          // onAnswer(data)
          break;
        case "candidate":
          // onCandidate(data)
          break;
        case "updateUsers":
          // updateUsersList(data)
          break;
        case "removeUser":
          // removeUser(data)
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const onConnect = (data: any) => {
    console.log(data);
  };

  const handleConnect = () => {
    send({
      type: "connect",
      name: state.uid,
    });
  };

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
