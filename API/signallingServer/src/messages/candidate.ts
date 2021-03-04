const buildCandidateResponse = (
  users: any,
  sendTo: (connection: wsType, message: object) => void
) => {
  const candidateResponse = (ws: wsType, data: CandidateData) => {
    const candidateRecipient = users[data.candidateTo];
    if (!!candidateRecipient) {
      sendTo(candidateRecipient, {
        type: "candidate",
        candidate: data.candidate,
      });
    } else {
      sendTo(ws, {
        type: "error",
        message: `User ${data.candidateTo} does not exist`,
      });
    }
  };
  return candidateResponse;
};

export default buildCandidateResponse;
