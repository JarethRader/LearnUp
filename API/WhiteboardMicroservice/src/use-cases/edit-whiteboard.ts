import makeWhiteboard from "../whiteboard";

// @ts-ignore
const buildEditWhiteboard: BuildEditWhiteboard = (
  whiteboardDB: any,
  formatUtils: any
) => {
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

    const updatedWhiteboard = await whiteboardInstance.update(id, changes);

    return updatedWhiteboard;
  };
  return editWhiteboard;
};

export default buildEditWhiteboard;
