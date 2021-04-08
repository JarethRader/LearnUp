import { uploadHelper } from "./upload";
import { updateHelper } from "./update";
import { deleteHelper } from "./delete";
import { getHelper } from "./getAll";
import { getWhiteboardHelper } from "./getWhiteboard";

const whiteboardHelperFunctions = Object({
  uploadHelper,
  updateHelper,
  deleteHelper,
  getHelper,
  getWhiteboardHelper,
});

export default whiteboardHelperFunctions;
export {
  uploadHelper,
  updateHelper,
  deleteHelper,
  getHelper,
  getWhiteboardHelper,
};
