const buildOfferResponse = (
  users: any,
  sendTo: (connection: wsType, message: object) => void
) => {
  const offerResponse = (ws: wsType, data: OfferData) => {
    const offerRecipient = users[data.name];
    if (!!offerRecipient) {
      sendTo(offerRecipient, {
        type: "offer",
        offer: data.offer,
        // @ts-ignore
        name: ws.name,
      });
    } else {
      sendTo(ws, {
        type: "error",
        message: `User ${data.name} does not exist`,
      });
    }
  };
  return offerResponse;
};

export default buildOfferResponse;
