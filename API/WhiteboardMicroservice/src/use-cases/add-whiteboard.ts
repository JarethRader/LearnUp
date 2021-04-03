/// <reference path='../types/index.d.ts' />

import makeWhiteboard from "../whiteboard";
const frontTiles = require("../data-access/utils/front.json");

// @ts-ignore
const buildAddWhiteboard = (whiteboardDB) => {
  const addWhiteboard = async (whiteboardInfo: IMakeWhiteboard) => {
    const whiteboard = makeWhiteboard(whiteboardInfo);

    const whiteboardInstance = await whiteboardDB();

    console.log(console.log("Creating new whiteboard"));

    return await whiteboardInstance.insert(whiteboard, frontTiles.tiles);
  };

  return addWhiteboard;
};

export default buildAddWhiteboard;
