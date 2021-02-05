import makeFakeWhiteboard from '../../__test__/whiteBoard';
import getOutput from '../../__test__/getOutput';
import buildEditWhiteboard from './edit-whiteboard';
import makeDB from '../data-access';
import Whiteboard from '../db';

describe('Edit a whiteboard state', () => {
  it('updates a whiteboard', async () => {
    const newWhiteboard = makeFakeWhiteboard({});

    const whiteboardInstance = await makeDB();
    await whiteboardInstance.insert(newWhiteboard);

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

    const editUser = buildEditWhiteboard(makeDB);
    const changed = await editUser(newWhiteboard._id, {
      boardState: updatedBoardState,
    });
    expect(getOutput(changed?.toObject()).boardState).toEqual(
      updatedBoardState
    );
  });
});
