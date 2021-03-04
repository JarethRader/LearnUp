/// <reference path="../types/index.d.ts" />

const buildMessageResponse = (
  sendTo: (connection: wsType, message: object) => void
) => {
  const messageResponse = (websocket: wsType, data: MessageData) => {
    sendTo(websocket, { type: data.type, message: data.message });
  };
  return messageResponse;
};

export default buildMessageResponse;
