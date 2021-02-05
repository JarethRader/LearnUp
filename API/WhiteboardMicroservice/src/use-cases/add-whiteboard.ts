/// <reference path='../types/index.d.ts' />

import makeWhiteboard from '../whiteboard';

const buildAddWhiteboard: BuildAddWhiteboard = (whiteboardDB) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    const whiteboard = makeWhiteboard(whiteboardInfo);

    const whiteboardInstance = await whiteboardDB();

    return await whiteboardInstance.insert(whiteboard.toObject());
  };

  return addWhiteboard;
};

export default buildAddWhiteboard;
