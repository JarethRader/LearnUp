const buildRemoveWhiteboard: BuildRemoveWhiteboard = (whiteboardDB) => {
  const deleteWhiteboard = async (id: string) => {
    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.remove(id);
  };
  return deleteWhiteboard;
};

export default buildRemoveWhiteboard;
