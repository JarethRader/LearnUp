/// <reference path='../types/index.d.ts' />

import makeWhiteboard from "../whiteboard";
const frontTiles = require("../data-access/utils/front.json");

// @ts-ignore
const buildAddWhiteboard = (whiteboardDB) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    const whiteboard = makeWhiteboard(whiteboardInfo);

    const whiteboardInstance = await whiteboardDB();

    // TODO: I should add some validation in here for the board name
    // TODO: I should add the feature to select different layouts and tie it into this point.

    return await whiteboardInstance.insert(whiteboard, frontTiles.tiles);
  };

  return addWhiteboard;
};

export default buildAddWhiteboard;
