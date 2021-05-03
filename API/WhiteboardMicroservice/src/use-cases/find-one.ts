// @ts-ignore
const buildFindOne: BuildListOneWhiteboard = (whiteboardDB) => {
  const findOne = async (whiteboardID: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance
      .findOneById(whiteboardID)
      .then((whiteboard) => whiteboard)
      .catch((err) => err);
  };
  return findOne;
};

export default buildFindOne;
