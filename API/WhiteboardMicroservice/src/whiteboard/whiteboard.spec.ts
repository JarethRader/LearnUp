// @ts-ignore
import makeFakeWhiteboard from '../../__test__/whiteBoard';
import makeWhiteboard from '.';

describe('whiteboard', () => {
  it('Must have a valid UID', () => {
    const whiteBoard = makeFakeWhiteboard({ _id: null });
    expect(() => makeWhiteboard(whiteBoard)).toThrow('Must have a valid ID');
  });
  it('Must have a valid author ID', () => {
    const whiteBoard = makeFakeWhiteboard({ author: null });
    expect(() => makeWhiteboard(whiteBoard)).toThrow(
      'Must have a valid author'
    );
  });
  it('Must have a valid audience ID if present', () => {
    const whiteBoard = makeFakeWhiteboard({ audience: null });
    expect(() => makeWhiteboard(whiteBoard)).toThrow(
      'Must have a valid audience ID'
    );
  });
  it('Must have a valid board state', () => {
    const whiteBoard = makeFakeWhiteboard({ boardState: null });
    expect(() => makeWhiteboard(whiteBoard)).toThrow(
      'Must have a valid board state'
    );
  });
});
