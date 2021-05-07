export {};

declare global {
  interface ConnectionState {
    uid: string;
    connection: RTCPeerConnection | null;
    channel: RTCDataChannel | null;
    message: any;
  }

  interface IConnectionMessage {
    type: string;
    message: string;
  }

  interface IConnectMessage {
    type: string;
    success: boolean;
    users: [
      {
        id: string;
        name: string;
      }
    ];
  }

  interface IUpdateUsersMessage {
    type: string;
    user: {
      id: string;
      name: string;
    };
  }

  interface ILeaveMessage {
    type: string;
    name: string;
    user: {
      id: string;
      name: string;
    };
  }

  interface IOfferMessage {
    type: string;
    name: string;
    offer: RTCSessionDescriptionInit;
  }

  interface IAnswerMessage {
    type: string;
    answer: RTCSessionDescriptionInit;
  }

  interface ICandidateMessage {
    type: string;
    candidate: RTCIceCandidateInit;
  }

  type TServerMessage =
    | IConnectionMessage
    | IConnectMessage
    | IUpdateUsersMessage
    | ILeaveMessage
    | IOfferMessage
    | IAnswerMessage
    | ICandidateMessage;

  interface UpdateConnection {
    type: "SET_CONNECTION";
    payload: RTCPeerConnection;
  }

  interface ClearConnection {
    type: "CLEAR_CONNECTION";
    payload: null;
  }

  interface UpdateChannel {
    type: "SET_CHANNEL";
    payload: RTCDataChannel;
  }

  interface ClearChannel {
    type: "CLEAR_CHANNEL";
    payload: null;
  }

  interface SendMessage {
    type: "SEND_MSG";
    payload: any;
  }

  interface ClearMessage {
    type: "CLEAR_MSG";
    payload: null;
  }

  type ConnectionAction =
    | UpdateConnection
    | ClearConnection
    | UpdateChannel
    | ClearChannel
    | SendMessage
    | ClearMessage;

  type ConnectionDispatch = (action: ConnectionAction) => void;
}
