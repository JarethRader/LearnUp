import makeWhiteboard from "../whiteboard";

// @ts-ignore
const buildEditWhiteboard = (whiteboardDB: any, formatUtils: any) => {
  const editWhiteboard = async (id: string, updatedInfo: IMakeWhiteboard) => {
    const whiteboardInstance = await whiteboardDB();

    const whiteboard = await whiteboardInstance.findOneById(id);

    const changes: IMakeWhiteboard = makeWhiteboard({
      ...formatUtils.format(whiteboard),
      ...updatedInfo,
      layout: {
        ...formatUtils.format(whiteboard).layout,
        ...updatedInfo.layout,
      },
    }).toObject();

    const updatedWhiteboard =
      whiteboardInstance && (await whiteboardInstance.update(id, changes));

    return updatedWhiteboard;
  };
  return editWhiteboard;
};

export default buildEditWhiteboard;
