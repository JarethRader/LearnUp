import getOutput from '../../__test__/getOutput';
import makeFakeWhiteboard from '../../__test__/whiteBoard';
import Whiteboard from '../db';
import buildPostWhiteboard from './post-whiteboard';

const addWhiteboard = async (whiteboard: IMakeWhiteboard) => {
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

describe('Post a Whiteboard State Controller', () => {
  it('Posts a new whiteboard state', async () => {
    const whiteboard: IMakeWhiteboard = makeFakeWhiteboard({});
    const postWhiteboard = buildPostWhiteboard(addWhiteboard);

    const request: ExpressHttpRequest = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: { whiteboard },
    };

    const expected: IController = {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      body: { whiteboard: request.body.whiteboard },
    };

    const actual = await postWhiteboard(request);

    expect(actual.headers).toEqual(expected.headers);
    expect(actual.statusCode).toEqual(expected.statusCode);
    expect(getOutput((actual as IControllerResponse).body.whiteboard)).toEqual(
      getOutput(expected.body.whiteboard)
    );
  });
});
