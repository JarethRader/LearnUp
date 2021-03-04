const buildAnswerResponse = (
  users: any,
  sendTo: (connection: wsType, message: object) => void
) => {
  const answerResponse = (ws: wsType, data: AnswerData) => {
    const answerRecipient = users[data.answerTo];
    if (!!answerRecipient) {
      sendTo(answerRecipient, {
        type: "answer",
        answer: data.answer,
      });
    } else {
      sendTo(ws, {
        type: "error",
        message: `User ${data.answerTo} does not exist`,
      });
    }
  };
  return answerResponse;
};

export default buildAnswerResponse;
