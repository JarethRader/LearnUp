import makeFakeWhiteboard from '../../__test__/whiteBoard';
import makeDB from '.';
import Whiteboard from '../db';

describe('Whiteboard db', () => {
  it('Adds a new whiteboard state', async () => {
    const whiteboardDB = await makeDB();
    const whiteboard = makeFakeWhiteboard({});
    const inserted = await whiteboardDB.insert(whiteboard);
    const findWhiteboard = await Whiteboard.findById(whiteboard._id);
    expect(findWhiteboard?.toObject()).toEqual(inserted?.toObject());
  });
  it('Updates an existing whiteboard state', async () => {
    const whiteboardDB = await makeDB();
    const whiteboard = makeFakeWhiteboard({});
    await whiteboardDB.insert(whiteboard);

    const updatedBoardState = [
      {
        index: 0,
        tile: {
          letters: 'a',
          color: 'bg-white',
        },
        deltaPosition: {
          x: 0,
          y: 0,
        },
      },
    ];

    const updated = await whiteboardDB.update(whiteboard._id, {
      boardState: updatedBoardState,
    });

    expect(updated?.toObject().boardState.length).toEqual(
      updatedBoardState.length
    );
  });

  it('Removes a whiteboard state', async () => {
    const whiteboardDB = await makeDB();
    const whiteboard = makeFakeWhiteboard({});
    await whiteboardDB.insert(whiteboard);
    await whiteboardDB.remove(whiteboard._id);
    const findWhiteboard = await whiteboardDB.findOneById(whiteboard._id);
    expect(findWhiteboard).not.toBeDefined();
  });
});
