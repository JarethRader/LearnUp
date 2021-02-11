import Id from '../Id';
import buildMakeWhiteboard from './whiteboard';

const nameRegex = /^[\w]+([-_\s]{1}[a-z0-9]+)*$/i;
const Name = Object.freeze({
  isValidName: (name: string) => nameRegex.test(name),
});

const makeWhiteboard = buildMakeWhiteboard(Id, Name);

export default makeWhiteboard;
