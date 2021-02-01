import React from 'react';

import tiles from '../components/tiles/index';
import FrontBoard from './learningBoard/frontBoard';
import BackBoard from './learningBoard/backBoard';

interface Props {}

const LearningBoard = (props: Props) => {
  const [word, setWord] = React.useState<ITile[]>([]);
  const addLetters = (tile: ITile) => {
    setWord([...word, tile]);
  };

  const handleResetWord = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setWord([]);
  };

  const [boardSide, setBoardSide] = React.useState(true);
  const toggleBoardSide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBoardSide(!boardSide);
  };

  return (
    <div className='w-full min-h-screen flex items-center flex-col bg-gray-300 py-4'>
      <div className='w-7/12 flex flex-col'>
        <div className='flex self-center'>
          <h1 className='text-yellow-500 font-bold text-5xl'>Learning Board</h1>
        </div>
        <div className='flex flex-col'>
          {boardSide ? (
            <p className='text-xl font-medium flex justify-left'>
              Front of board
            </p>
          ) : (
            <p className='text-xl font-medium flex justify-left'>
              Back of board
            </p>
          )}
          <div>
            <button
              onClick={(e) => toggleBoardSide(e)}
              className='px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 focus:outline-none text-white'>
              Flip Board
            </button>
          </div>
        </div>
      </div>
      <hr className='my-2' />
      {boardSide ? (
        <FrontBoard
          tiles={tiles}
          addLetters={addLetters}
          handleResetWord={handleResetWord}
          word={word}
        />
      ) : (
        <BackBoard
          tiles={tiles}
          addLetters={addLetters}
          handleResetWord={handleResetWord}
          word={word}
        />
      )}
    </div>
  );
};

export default LearningBoard;
