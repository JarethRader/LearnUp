import {
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
  getOwnWhiteboards,
  getSharedWhiteboards,
} from '../use-cases';
import buildPostWhiteboard from './post-whiteboard';
import buildPatchWhiteboard from './patch-whiteboard';
import buildDeleteWhiteboard from './delete-whiteboard';
import buildGetWhiteboards from './get-whiteboard';

const postWhiteboard = buildPostWhiteboard(addWhiteboard);
const patchWhiteboard = buildPatchWhiteboard(editWhiteboard);
const deleteWhiteboard = buildDeleteWhiteboard(removeWhiteboard);
const getWhiteboards = buildGetWhiteboards(
  getOwnWhiteboards,
  getSharedWhiteboards
);

const whiteboardController = {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
  getWhiteboards,
};

export default whiteboardController;
export { postWhiteboard, patchWhiteboard, deleteWhiteboard, getWhiteboards };
