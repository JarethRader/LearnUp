import getOutput from '../../__test__/getOutput';
import makeFakeWhiteboard from '../../__test__/whiteBoard';
import Whiteboard from '../db';
import buildPatchWhiteboard from './patch-whiteboard';

const editWhiteboard = async (id: string, whiteboard: IMakeWhiteboard) => {
  const newWhiteboard = new Whiteboard({
    _id: whiteboard.whiteboard._id,
    author: whiteboard.whiteboard.author,
    audience: whiteboard.whiteboard.audience,
    boardState: whiteboard.whiteboard.boardState,
    createdAt: whiteboard.whiteboard.createdOn,
    updatedAt: whiteboard.whiteboard.modifiedOn,
  });
  return newWhiteboard;
};

describe('Patch Whiteboard State Controller', () => {
  it('Successfully patches a whiteboard state', async () => {
    const whiteboard = await makeFakeWhiteboard({});
    const patchWhiteboard = buildPatchWhiteboard(editWhiteboard);

    const request: ExpressHttpRequest = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: whiteboard._id,
      },
      body: { whiteboard },
    };
    const expected: IControllerResponse = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: { whiteboard: request.body.whiteboard },
    };

    const actual = await patchWhiteboard(request);
    expect(actual.headers).toEqual(expected.headers);
    expect(actual.statusCode).toEqual(expected.statusCode);
    expect(getOutput((actual as IControllerResponse).body.whiteboard)).toEqual(
      getOutput(expected.body.whiteboard)
    );
  });
});
