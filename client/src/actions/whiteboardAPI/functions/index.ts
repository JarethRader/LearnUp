import { uploadHelper } from './upload';
import { updateHelper } from './update';
import { deleteHelper } from './delete';
import { getHelper } from './get';

const whiteboardHelperFunctions = Object({
  uploadHelper,
  updateHelper,
  deleteHelper,
  getHelper,
});

export default whiteboardHelperFunctions;
export { uploadHelper, updateHelper, deleteHelper, getHelper };
