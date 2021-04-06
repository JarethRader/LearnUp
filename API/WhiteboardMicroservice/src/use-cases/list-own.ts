// @ts-ignore
const buildListOwn = (whiteboardDB) => {
  const getOwn = async (id: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.findByAuthor(id);
  };
  return getOwn;
};

export default buildListOwn;
