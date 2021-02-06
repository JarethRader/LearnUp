const buildListShared: BuildListWhiteboards = (whiteboardDB) => {
  const getShared = async (id: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.findByAuthor(id);
  };
  return getShared;
};

export default buildListShared;
