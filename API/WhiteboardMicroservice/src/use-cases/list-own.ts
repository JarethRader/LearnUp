// @ts-ignore
const buildListOwn: BuildListWhiteboards = (whiteboardDB) => {
  const getOwn = async (id: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.findByAuthor(id);
  };
  return getOwn;
};

export default buildListOwn;
