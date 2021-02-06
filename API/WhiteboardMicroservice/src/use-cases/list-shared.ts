const buildListShared: BuildListWhiteboards = (whiteboardDB) => {
  const getShared = async (id: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.findByAudience(id);
  };
  return getShared;
};

export default buildListShared;
