const buildMakeWhiteboardDB = (whiteboardSchemas: any) =>
  Object.freeze({
    insert: (newWhiteboard: any, newlayout: any, newLearningSet: any) => {
      whiteboardSchemas.WhiteboardSchema.create(...newWhiteboard)
        .then((newWhiteboard: any) => {
          console.log(newWhiteboard.get());
        })
        .catch((err: any) => {
          console.log("Error while creating new whiteboard: ", err);
        });
    },
  });

export default buildMakeWhiteboardDB;
