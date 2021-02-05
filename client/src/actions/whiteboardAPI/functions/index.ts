import { uploadHelper } from './upload';
import { updateHelper } from './update';
import { deleteHelper } from './delete';

const whiteboardHelperFunctions = Object({
  uploadHelper,
  updateHelper,
  deleteHelper,
});

export default whiteboardHelperFunctions;
export { uploadHelper, updateHelper, deleteHelper };
