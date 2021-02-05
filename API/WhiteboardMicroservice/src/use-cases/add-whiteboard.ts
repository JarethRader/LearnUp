import makeWhiteboard from '../whiteboard';

const buildAddWhiteboard: BuildAddWhiteboard = (whiteboardDb) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    const whiteboard: IWhiteboardObject = makeWhiteboard(whiteboardInfo);

    const whiteboardInstance = await whiteboardDb();

    return await whiteboardInstance.insert(whiteboard.toObject());
  };
  return addWhiteboard;
};

export default buildAddWhiteboard;
