import buildAddWhiteboard from "./add-whiteboard";
import buildEditWhiteboard from "./edit-whiteboard";
import buildRemoveWhiteboard from "./remove-whiteboard";
import buildGetOwn from "./list-own";
import buildGetShared from "./list-shared";
import buildFindOne from "./find-one";

import makeDb from "../data-access";
import buildMakeDB from "../data-access/pg-index";

// @ts-ignore
const addWhiteboard = buildAddWhiteboard(buildMakeDB);
const editWhiteboard = buildEditWhiteboard(makeDb);
const removeWhiteboard = buildRemoveWhiteboard(buildMakeDB);
const getOwnWhiteboards = buildGetOwn(makeDb);
const getSharedWhiteboards = buildGetShared(makeDb);
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
