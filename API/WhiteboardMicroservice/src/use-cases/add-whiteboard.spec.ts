import makeFakeWhiteboard from '../../__test__/whiteBoard';
// @ts-ignore
import getOutput from '../../__test__/getOutput';
import makeDB from '../data-access';
import buildAddWhiteboard from './add-whiteboard';
import Whiteboard from '../db';

describe('Add whiteboard', () => {
  it('Makes a new whiteboard state', async () => {
    const whiteboard = makeFakeWhiteboard({});
    const addWhiteboard = buildAddWhiteboard(makeDB);
    const inserted = await addWhiteboard(whiteboard);
    expect(getOutput(inserted?.toObject())).toEqual(getOutput(whiteboard));
  });
});
