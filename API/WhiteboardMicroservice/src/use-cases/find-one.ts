// @ts-ignore
const buildFindOne = (whiteboardDB) => {
  const findOne = async (whiteboardID: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.findOneById(whiteboardID);
  };
  return findOne;
};

export default buildFindOne;
