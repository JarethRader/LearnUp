import { v4 as uuidv4 } from "uuid";
import broadcast from "../broadcast";

import buildMessageResponse from "./message";
import buildConnectResponse from "./connect";
import buildOfferResponse from "./offer";
import buildAnswerResponse from "./answer";
import buildCandidateResponse from "./candidate";

let users: any = {};

const messageResponse = buildMessageResponse(broadcast.sendTo);
const connectResponse = buildConnectResponse(
  users,
  uuidv4,
  broadcast.sendTo,
  broadcast.sendToAll
);
const offerResponse = buildOfferResponse(users, broadcast.sendTo);
const answerResponse = buildAnswerResponse(users, broadcast.sendTo);
const candidateResponse = buildCandidateResponse(users, broadcast.sendTo);

const messageUtils = Object.freeze({
  messageResponse,
  connectResponse,
  offerResponse,
  answerResponse,
  candidateResponse,
});

export default messageUtils;
export {
  messageResponse,
  connectResponse,
  offerResponse,
  answerResponse,
  candidateResponse,
};
