import buildAddWhiteboard from './add-whiteboard';
import buildEditWhiteboard from './edit-whiteboard';
import buildRemoveWhiteboard from './remove-whiteboard';

import makeDb from '../data-access';

const addWhiteboard = buildAddWhiteboard(makeDb);
const editWhiteboard = buildEditWhiteboard(makeDb);
const removeWhiteboard = buildRemoveWhiteboard(makeDb);

const userServices = Object.freeze({
  addWhiteboard,
  editWhiteboard,
  removeWhiteboard,
});

export default userServices;
export { addWhiteboard, editWhiteboard, removeWhiteboard };
