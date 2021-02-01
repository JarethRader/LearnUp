import React from 'react';

import tiles from '../components/tiles/index';
import FrontBoard from './learningBoard/frontBoard';

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

  return (
    <div className='w-full min-h-screen flex items-center flex-col bg-gray-300 py-4'>
      <div className='w-7/12 flex flex-col'>
        <div className='flex self-center'>
          <h1 className='text-yellow-500 font-bold text-5xl'>Learning Board</h1>
        </div>
        <div>
          <p className='text-xl font-medium flex justify-left'>
            Front of board
          </p>
        </div>
      </div>
      <hr className='my-2' />
      <FrontBoard
        tiles={tiles}
        addLetters={addLetters}
        handleResetWord={handleResetWord}
        word={word}
      />
    </div>
  );
};

export default LearningBoard;
