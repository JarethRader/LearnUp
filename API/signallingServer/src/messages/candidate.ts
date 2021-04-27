const buildCandidateResponse = (
  users: any,
  sendTo: (connection: wsType, message: object) => void
) => {
  const candidateResponse = (ws: wsType, data: CandidateData) => {
    const candidateRecipient = users[data.name];
    if (!!candidateRecipient) {
      sendTo(candidateRecipient, {
        type: "candidate",
        candidate: data.candidate,
      });
    } else {
      sendTo(ws, {
        type: "error",
        message: `User ${data.name} does not exist`,
      });
    }
  };
  return candidateResponse;
};

export default buildCandidateResponse;
