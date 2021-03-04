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

  interface IConnectData {
    type: string;
    name: string;
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
    offerTo: string;
    offer: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @offerTo user to send offer to
   * @offer message of offer
   */
  type OfferData = IOfferData;

  interface IAnswerData {
    type: string;
    name: string;
    answerTo: string;
    answer: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @answerTo user to send answer to (the one who sent the offer originally)
   * @answer message of answer
   */
  type AnswerData = IAnswerData;

  interface ICandidateData {
    type: string;
    name: string;
    candidateTo: string;
    candidate: string;
  }
  /**
   * @type message type
   * @name name of sender
   * @CandidateTo IDk what this does tbh
   * @candidate user to send ICEcandidates to
   */
  type CandidateData = ICandidateData;

  type MessageTypes = MessageData | ConnectData | OfferData | AnswerData;
}
