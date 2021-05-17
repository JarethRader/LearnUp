/// <reference path='../types/index.d.ts' />

import makeWhiteboard from "../whiteboard";
const frontTiles = require("../../config/data-access/front.json");
const backTiles = require("../../config/data-access/back.json");

// @ts-ignore
const buildAddWhiteboard: BuildAddWhiteboard = (whiteboardDB) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    return new Promise<Whiteboard>(async (resolve, reject) => {
      const whiteboard = makeWhiteboard(whiteboardInfo);

      const whiteboardInstance = await whiteboardDB();

      // TODO: I should add some validation in here for the board name
      // TODO: I should add the feature to select different layouts and tie it into this point.

      const tileSet =
        whiteboardInfo.boardType === "default"
          ? [frontTiles.tiles, backTiles.tiles]
          : [];

      return await whiteboardInstance
        .insert(whiteboard.toObject(), tileSet)
        .then((whiteboard) => resolve(whiteboard))
        .catch((err) => reject(err));
    });
  };

  return addWhiteboard;
};

export default buildAddWhiteboard;
