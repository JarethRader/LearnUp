import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import tiles from '../components/tiles/index';
import FrontBoard from './learningBoard/frontBoard';
import BackBoard from './learningBoard/backBoard';
import BoardInput from './learningBoard/boardInput';
import DraggableTile from './learningBoard/draggableTile';

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

  const [selectedTile, setSelectedTile] = React.useState<ITile>();
  const handleSetSelected = (tile: ITile | undefined) => {
    setSelectedTile(tile);
  };

  const [selectedBounds, setBounds] = React.useState<IBounds>();
  const handleSetBounds = (bounds: IBounds | undefined) => {
    setBounds(bounds);
  };

  return (
    <div>
      <div className='absolute top-0 left-0 z-20'>
        {selectedTile && (
          <DraggableTile
            tile={selectedTile}
            bounds={selectedBounds}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
          />
        )}
      </div>
      <div className='w-full min-h-screen flex items-center flex-col bg-gray-300 py-4'>
        <div className='w-7/12 flex flex-col'>
          <div className='flex self-center'>
            <h1 className='text-yellow-500 font-bold text-5xl'>
              Learning Board
            </h1>
          </div>
          <div className='flex flex-row justify-around'>
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
                className='px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-600 focus:outline-none text-white font-semibold stroke'>
                Flip Board
              </button>
              <Link to='/dashboard'>
                <button className='px-4 py-2 mx-1 rounded bg-blue-500 hover:bg-blue-600 focus:outline-none text-white font-semibold stroke'>
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr className='my-2' />
        {boardSide ? (
          <FrontBoard
            tiles={tiles}
            BoardInput={BoardInput}
            addLetters={addLetters}
            handleResetWord={handleResetWord}
            word={word}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
          />
        ) : (
          <BackBoard
            tiles={tiles}
            BoardInput={BoardInput}
            addLetters={addLetters}
            handleResetWord={handleResetWord}
            word={word}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
          />
        )}
      </div>
    </div>
  );
};

export default LearningBoard;
