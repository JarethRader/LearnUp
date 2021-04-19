export {};

declare global {
  interface ConnectionState {
    uid: string;
    connection: any;
    channel: any;
  }

  interface UpdateConnection {
    type: "SET_CONNECTION";
    payload: any;
  }

  interface ClearConnection {
    type: "CLEAR_CONNECTION";
    payload: null;
  }

  interface UpdateChannel {
    type: "SET_CHANNEL";
    payload: any;
  }

  interface ClearChannel {
    type: "CLEAR_CHANNEL";
    payload: null;
  }

  type ConnectionAction =
    | UpdateConnection
    | ClearConnection
    | UpdateChannel
    | ClearChannel;

  type ConnectionDispatch = (action: ConnectionAction) => void;
}
