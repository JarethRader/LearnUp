/// <reference path='../types/index.d.ts' />

import makeWhiteboard from "../whiteboard";
const frontTiles = require("../data-access/utils/front.json");
const backTiles = require("../data-access/utils/back.json");

// @ts-ignore
const buildAddWhiteboard = (whiteboardDB) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    const whiteboard = makeWhiteboard(whiteboardInfo);

    const whiteboardInstance = await whiteboardDB();

    // TODO: I should add some validation in here for the board name
    // TODO: I should add the feature to select different layouts and tie it into this point.

    const tileSet =
      whiteboardInfo.boardType === "default"
        ? [frontTiles.tiles, backTiles.tiles]
        : [];

    return await whiteboardInstance.insert(whiteboard.toObject(), tileSet);
  };

  return addWhiteboard;
};

export default buildAddWhiteboard;
