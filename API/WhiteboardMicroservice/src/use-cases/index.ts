import buildAddWhiteboard from "./add-whiteboard";
import buildEditWhiteboard from "./edit-whiteboard";
import buildRemoveWhiteboard from "./remove-whiteboard";
import buildGetOwn from "./list-own";
import buildGetShared from "./list-shared";
import buildFindOne from "./find-one";

import buildMakeDB from "../data-access/pg-index";

import formatUtils from "./format-whiteboard";

// TODO: I need to rewrite the type definitions for all these functions, right now I'm just ignoring the errors typescript is throwing
const addWhiteboard = buildAddWhiteboard(buildMakeDB);
const editWhiteboard = buildEditWhiteboard(buildMakeDB, formatUtils);
const removeWhiteboard = buildRemoveWhiteboard(buildMakeDB);
const getOwnWhiteboards = buildGetOwn(buildMakeDB);
const getSharedWhiteboards = buildGetShared(buildMakeDB);
const findOneWhiteboard = buildFindOne(buildMakeDB);

const userServices = Object.freeze({
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
  findOneWhiteboard,
});

export default userServices;
export {
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
  findOneWhiteboard,
};
