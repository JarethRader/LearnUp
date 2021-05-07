import React from "react";
import { v4 as uuidv4 } from "uuid";

// use null for local connections, e.g. in development
const configuration =
  process.env.NODE_ENV === "development"
    ? null
    : {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.stunprotocol.org:3478" },
        ],
      };

// TODO: add types for these contexts
const MessageContext = React.createContext<{
  message: any;
  updateMessage: (msg: any) => void;
}>({
  message: null,
  updateMessage: () => {},
});

const ResponseContext = React.createContext<{
  response: any;
  updateResponse: (rsp: any) => void;
}>({
  response: null,
  updateResponse: () => {},
});

const RoomContext = React.createContext<{
  room: string | null;
  updateRoom: (room: string) => void;
}>({
  room: null,
  updateRoom: () => {},
});

const RTCProvider: React.FC = ({ children }: any) => {
  const uid = uuidv4();
  // const peerConnection = new RTCPeerConnection(configuration);

  const [connection, setConnection] = React.useState<RTCPeerConnection | null>(
    null
  );
  const [channel, setChannel] = React.useState<RTCDataChannel | null>(null);
  const [message, setMessage] = React.useState<any>({});
  const updateMessage = (msg: string) => {
    setMessage(msg);
  };
  const [response, setResponse] = React.useState<any>({});
  const updateResponse = (rsp: string) => {
    setResponse(rsp);
  };

  const [room, setRoom] = React.useState<string | null>(null);
  const updateRoom = (room: string) => {
    setRoom(room);
  };

  const connectedRef = React.useRef();
  const [users, setUsers] = React.useState<{ id: string; name: string }[]>([]);

  // connect to webSocket
  const webSocket = React.useRef<WebSocket | null>(null);
  const [connected, setConnected] = React.useState(false);
  const [socketMessages, setSocketMessages] = React.useState<TServerMessage[]>(
    []
  );
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
  // Method to send message to socket server
  const send = (data: any) => {
    // @ts-ignore
    webSocket.current.send(JSON.stringify(data));
  };

  React.useEffect(() => {
    connectWebSocket()
      .then((success) => {
        // console.log("Successfully connected to websocket");
        // handleConnect();
      })
      .catch((err) => {
        console.log("websocket failed to connect: ", err);
      });

    // TODO: I need to make sure the cleanup works consistently and as expected
    const cleanup = () => {
      send({
        type: "leave",
        // name: uid,
        // room,
      });
      // @ts-ignore
      webSocket.current.close();
      setConnected(false);
    };

    window.addEventListener("beforeunload", cleanup);

    return () => window.addEventListener("beforeunload", cleanup);
  }, []);

  const handleDataChannleMessage = (data: any) => {
    // console.log("Data channel message", data.data);
    updateResponse(JSON.parse(data.data));
  };

  React.useEffect(() => {
    if (connected && room) {
      send({
        type: "connect",
        name: uid,
        room,
      });
    }
  }, [connected, room]);

  // Handle socket message
  React.useEffect(() => {
    const data = socketMessages.pop();
    // console.log("Data recieved:", data);
    if (data) {
      switch (data.type) {
        case "connection":
          setConnected(true);
          break;
        case "connect":
          onConnect(data as IConnectMessage);
          break;
        case "updateUsers":
          updateUsers(data as IUpdateUsersMessage);
          break;
        case "removeUser":
          removeUser(data as ILeaveMessage);
          break;
        case "offer":
          onOffer(data as IOfferMessage);
          break;
        case "answer":
          onAnswer(data as IAnswerMessage);
          break;
        case "candidate":
          onCandidate(data as ICandidateMessage);
          break;
        case "leave":
          removeUser(data as ILeaveMessage);
          break;
        case "error":
          console.log("error");
          break;
        default:
          break;
      }
    }
  }, [socketMessages]);

  const updateUsers = (data: IUpdateUsersMessage) => {
    setUsers((prev) => [...prev, data.user]);
    toggleConnection(data.user.name);
  };

  const removeUser = (data: ILeaveMessage) => {
    setUsers((prev) => prev.filter((user) => user.name !== data.name));
    toggleConnection(data.name);
    createPeerConnection().catch((err) => console.log(err));
    // setConnection(null);
    // setChannel(null);
  };

  const onConnect = (data: IConnectMessage) => {
    if (data.success) {
      setUsers(data.users);
      createPeerConnection().catch((err) => console.log(err));
    } else {
      // console.log("user is already connected");
    }
  };

  const createPeerConnection = () => {
    return new Promise((resolve, reject) => {
      try {
        // @ts-ignore
        const localConnection = new RTCPeerConnection(configuration);
        localConnection.onicecandidate = (event) => {
          const connectedTo = connectedRef.current;
          if (event.candidate && connectedTo) {
            send({
              type: "candidate",
              name: connectedTo,
              candidate: event.candidate,
            });
          }
        };
        localConnection.ondatachannel = (event) => {
          // console.log("Data Channel is created");
          const recieveChannel = event.channel;
          recieveChannel.onopen = () => {
            // console.log("Data channel is open and ready to use");
          };
          recieveChannel.onmessage = (msg) => handleDataChannleMessage(msg);
          setChannel(recieveChannel);
        };
        setConnection(localConnection);
        connection && channel && resolve(true);
      } catch (err) {
        reject(err);
      }
    });
  };

  // React.useEffect(() => {
  //   users.forEach((user) => {
  //     connection && toggleConnection(user.name);
  //   });
  // }, [users]);

  const onOffer = (data: IOfferMessage) => {
    // @ts-ignore
    connectedRef.current = data.name;

    connection &&
      connection
        .setRemoteDescription(new RTCSessionDescription(data.offer))
        .then(() => connection.createAnswer())
        .then((answer) => connection.setLocalDescription(answer))
        .then(() =>
          send({
            type: "answer",
            name: data.name,
            answer: connection.localDescription,
          })
        )
        .catch((err) => console.log("Failed to send answer", err));
  };

  const onAnswer = (data: IAnswerMessage) => {
    connection &&
      connection
        .setRemoteDescription(new RTCSessionDescription(data.answer))
        .catch((err) => console.log("Error onAnswer", err));
  };

  const onCandidate = (data: ICandidateMessage) => {
    connection &&
      connection
        .addIceCandidate(new RTCIceCandidate(data.candidate))
        .catch((err) => console.log("Error onCandidate", err));
    // console.log("Successfully added ICE candidate");
  };

  const handleConnection = (name: string) => {
    if (connection) {
      const dataChannel = connection.createDataChannel("messenger");
      dataChannel.onerror = (err) => {
        console.log("Data Channel Error: ", err);
      };

      dataChannel.onmessage = (msg) => handleDataChannleMessage(msg);
      setChannel(dataChannel);

      connection
        .createOffer()
        .then((offer) => connection.setLocalDescription(offer))
        .then(() =>
          send({
            type: "offer",
            offer: connection.localDescription,
            name,
          })
        )
        .catch((err) => console.log("Error sending offer"));
    }
  };

  const toggleConnection = (name: string) => {
    if (connectedRef.current === name) {
      // @ts-ignore
      connectedRef.current = "";
    } else {
      // @ts-ignore
      connectedRef.current = name;
      handleConnection(name);
    }
  };

  // send message
  React.useEffect(() => {
    if (channel && channel.readyState === "open") {
      channel.send(JSON.stringify(message));
    }
  }, [message]);

  // React.useEffect(() => {
  //   console.log("Channel", channel?.readyState);
  //   console.log("Connection", connection?.connectionState);
  // }, [channel, connection]);

  return (
    <MessageContext.Provider value={{ message, updateMessage }}>
      <ResponseContext.Provider value={{ response, updateResponse }}>
        <RoomContext.Provider value={{ room, updateRoom }}>
          {children}
        </RoomContext.Provider>
      </ResponseContext.Provider>
    </MessageContext.Provider>
  );
};

const MessageConsumer = MessageContext.Consumer;
const ResponseConsumer = ResponseContext.Consumer;
const RoomConsumer = RoomContext.Consumer;
export { RTCProvider, MessageConsumer, ResponseConsumer, RoomConsumer };
