import {
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
  findOneWhiteboard,
} from "../use-cases";
import buildPostWhiteboard from "./post-whiteboard";
import buildPatchWhiteboard from "./patch-whiteboard";
import buildDeleteWhiteboard from "./delete-whiteboard";
import buildGetWhiteboards from "./get-whiteboard";
import buildGetAllWhiteboards from "./get-all-whiteboards";

const postWhiteboard = buildPostWhiteboard(addWhiteboard);
const patchWhiteboard = buildPatchWhiteboard(editWhiteboard);
const deleteWhiteboard = buildDeleteWhiteboard(removeWhiteboard);
const getWhiteboards = buildGetWhiteboards(findOneWhiteboard);
const getAllWhiteboards = buildGetAllWhiteboards(getOwnWhiteboards);

const whiteboardController = {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
  getWhiteboards,
  getAllWhiteboards,
};

export default whiteboardController;
export {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
  getWhiteboards,
  getAllWhiteboards,
};
