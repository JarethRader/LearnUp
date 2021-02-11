import Id from '../src/Id';

const makeFakeWhiteboard = ({ ...overrides }) => {
  const whiteboard = {
    _id: Id.makeId(),
    name: 'My Board',
    author: Id.makeId(),
    audience: Id.makeId(),
    boardState: [
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
      {
        index: 1,
        tile: {
          letters: 'ee',
          color: 'bg-green-500',
        },
        deltaPosition: {
          x: 50,
          y: 0,
        },
      },
    ],
  };

  return {
    ...whiteboard,
    ...overrides,
  };
};

export default makeFakeWhiteboard;
