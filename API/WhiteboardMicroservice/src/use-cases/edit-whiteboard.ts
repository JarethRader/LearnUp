import makeWhiteboard from '../whiteboard';

const buildEditWhiteboard: BuildEditWhiteboard = (whiteboardDB) => {
  const editWhiteboard = async (id: string, updatedInfo: IMakeWhiteboard) => {
    const whiteboardInstance = await whiteboardDB();
    
    const whiteboard = await whiteboardInstance.findOneById(id);
  
    const changes: IMakeWhiteboard = makeWhiteboard({
      ...(whiteboard && whiteboard.toObject()),
      ...updatedInfo,
    }).toObject();

    const filtered = Object.keys(changes)
      .filter((key) => key != '_id')
      .reduce((obj: any, key: any) => {
        obj[key] = changes[key];
        return obj;
      }, {});

    const updatedWhiteboard =
      whiteboardInstance && (await whiteboardInstance.update(id, filtered));

    return updatedWhiteboard;
  };
  return editWhiteboard;
};

export default buildEditWhiteboard;
