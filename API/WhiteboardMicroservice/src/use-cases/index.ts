import buildAddWhiteboard from "./add-whiteboard";
import buildEditWhiteboard from "./edit-whiteboard";
import buildRemoveWhiteboard from "./remove-whiteboard";
import buildGetOwn from "./list-own";
import buildGetShared from "./list-shared";

import makeDb from "../data-access";
import buildMakeDB from "../data-access/pg-index";

// @ts-ignore
const addWhiteboard = buildAddWhiteboard(buildMakeDB);
const editWhiteboard = buildEditWhiteboard(makeDb);
const removeWhiteboard = buildRemoveWhiteboard(makeDb);
const getOwnWhiteboards = buildGetOwn(makeDb);
const getSharedWhiteboards = buildGetShared(makeDb);

const userServices = Object.freeze({
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
});

export default userServices;
export {
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
};
