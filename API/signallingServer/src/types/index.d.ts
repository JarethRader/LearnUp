import WebSocket from "ws";

export {};

declare global {
  type wsType = WebSocket;
  type wssType = WebSocket.Server;

  interface IMessageData {
    type: string;
    message: string;
  }
  type MessageData = IMessageData;

  interface IUser {
    id: string;
    name: string;
    room: string;
  }

  interface IConnectData {
    type: string;
    name: string;
    room: string;
    message: string;
  }
  /**
   * @type message type
   * @name name of sender
   */
  type ConnectData = IConnectData;

  interface IOfferData {
    type: string;
    name: string;
    offer: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @offer message of offer
   */
  type OfferData = IOfferData;

  interface IAnswerData {
    type: string;
    name: string;
    answer: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @answer message of answer
   */
  type AnswerData = IAnswerData;

  interface ICandidateData {
    type: string;
    name: string;
    candidate: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @candidate user to send ICEcandidates to
   */
  type CandidateData = ICandidateData;

  type MessageTypes = MessageData | ConnectData | OfferData | AnswerData;
}
