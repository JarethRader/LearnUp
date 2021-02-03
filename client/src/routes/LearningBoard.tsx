import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import tiles from '../components/tiles/index';
import FrontBoard from './learningBoard/frontBoard';
import BackBoard from './learningBoard/backBoard';
import BoardInput from './learningBoard/boardInput';
import DraggableTile from './learningBoard/draggableTile';

declare global {
  interface IBounds {
    bottom: string;
    height: string;
    left: string;
    right: string;
    top: string;
    width: string;
    x: string;
    y: string;
  }

  interface BoardProps {
    tiles: any;
    BoardInput: (props: IBoardInputProps) => JSX.Element;
    addLetters: (tile: ITile) => void;
    handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
    word: ITile[];
    selectedTile?: ITile | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
    setInputBounds: React.Dispatch<React.SetStateAction<IBounds | undefined>>;
  }
}

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

  const [inputBounds, setInputBounds] = React.useState<IBounds>();
  const [draggableBounds, setDraggableBounds] = React.useState<{
    x: string;
    y: string;
  }>();
  // const handleSetInputBounds = (bounds: IBounds) => {
  //   setBounds(bounds);
  // }

  const [canAdd, setCanAdd] = React.useState(false);
  React.useEffect(() => {
    if (draggableBounds && inputBounds) {
      if (
        draggableBounds.y > inputBounds.top &&
        draggableBounds.y < inputBounds.bottom &&
        draggableBounds.x > inputBounds.left &&
        draggableBounds.x < inputBounds.right
      ) {
        setCanAdd(true);
      } else {
        setCanAdd(false);
      }
    } else {
      setCanAdd(false);
    }
  }, [draggableBounds]);

  const addTileToInput = (tile: ITile) => {
    if (canAdd) {
      addLetters(tile);
    }
  };

  return (
    <div>
      <div className='absolute z-20'>
        {selectedTile && (
          <DraggableTile
            tile={selectedTile}
            bounds={selectedBounds}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
            addTile={addTileToInput}
            setDraggableBounds={setDraggableBounds}
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
            selectedTile={selectedTile}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
            setInputBounds={setInputBounds}
          />
        ) : (
          <BackBoard
            tiles={tiles}
            BoardInput={BoardInput}
            addLetters={addLetters}
            handleResetWord={handleResetWord}
            word={word}
            selectedTile={selectedTile}
            setSelectedTile={handleSetSelected}
            handleSetBounds={handleSetBounds}
            setInputBounds={setInputBounds}
          />
        )}
      </div>
    </div>
  );
};

export default LearningBoard;
