import { addWhiteboard, editWhiteboard, removeWhiteboard } from '../use-cases';
import buildPostWhiteboard from './post-whiteboard';
import buildPatchWhiteboard from './patch-whiteboard';
import buildDeleteWhiteboard from './delete-whiteboard';

const postWhiteboard = buildPostWhiteboard(addWhiteboard);
const patchWhiteboard = buildPatchWhiteboard(editWhiteboard);
const deleteWhiteboard = buildDeleteWhiteboard(removeWhiteboard);

const whiteboardController = {
  postWhiteboard,
  patchWhiteboard,
  deleteWhiteboard,
};

export default whiteboardController;
export { postWhiteboard, patchWhiteboard, deleteWhiteboard };
