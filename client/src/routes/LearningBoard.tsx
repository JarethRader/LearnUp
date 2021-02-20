import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import tiles from '../components/tiles/index';
import FrontBoard from './learningBoard/frontBoard';
import BackBoard from './learningBoard/backBoard';
import BoardInput from './learningBoard/boardInput';
import DraggableTile from './learningBoard/draggableTile';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/index';
import {
  setCurrentBoard,
  clearCurrentBoard,
  updateBoard,
} from '../actions/whiteboardAPI/whiteboardActions';

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
    handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
    wordList: IWordList[];
    selectedTile?: ITile | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
    setInputBounds: React.Dispatch<React.SetStateAction<IBounds | undefined>>;
  }

  interface IAddWord {
    tile: ITile;
    deltaPosition: {
      x: number;
      y: number;
    };
  }

  interface IWordList extends IAddWord {
    index: number;
  }
}

interface learningBoardProps {}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  currentBoard: state.whiteboard.currentBoard,
  userLoading: state.user.userLoading,
});

const mapDispatchToProps = {
  setCurrentBoard,
  clearCurrentBoard,
  updateBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & learningBoardProps;

const LearningBoard = (props: Props) => {
  const [wordList, setWord] = React.useState<IWordList[]>(
    props.currentBoard.boardState
  );
  const addLetters = (tile: IAddWord) => {
    const newWord = {
      index:
        wordList.length === 0 ? 0 : wordList[wordList.length - 1].index + 1,
      tile: tile.tile,
      deltaPosition: tile.deltaPosition,
    };
    updateBoardState([...wordList, newWord]);
    
  };

  const handleResetWord = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    updateBoardState([]);
  };

  const updateBoardState = (wordList: IWordList[]) => {
    console.log(wordList)
    setWord(wordList);
    props.setCurrentBoard({
      ...props.currentBoard,
      boardState: wordList,
    });
    props.updateBoard(props.currentBoard._id, {
      boardState: wordList,
    });
  }

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

  const [canAdd, setCanAdd] = React.useState(false);
  React.useEffect(() => {
    if (draggableBounds && inputBounds) {
      if (
        draggableBounds.y > inputBounds.top &&
        draggableBounds.y < inputBounds.bottom &&
        draggableBounds.x > inputBounds.left &&
        draggableBounds.x < inputBounds.right
      ) {
        if (canAdd === false) {
          setCanAdd(true);
        }
      } else {
        if (canAdd === true) {
          setCanAdd(false);
        }
      }
    } else {
      if (canAdd === true) {
        setCanAdd(false);
      }
    }
  }, [draggableBounds]);

  const addTileToInput = (tile: ITile) => {
    if (canAdd) {
      if (wordList.length === 0) {
        addLetters({ tile: tile, deltaPosition: { x: 0, y: 0 } });
      } else if (
        wordList[wordList.length - 1].deltaPosition.x >=
        parseInt(inputBounds!.right) - 100
      ) {
        addLetters({
          tile: tile,
          deltaPosition: {
            x: 0,
            y: wordList[wordList.length - 1].deltaPosition.y + 50,
          },
        });
      } else if (
        wordList[wordList.length - 1].deltaPosition.x <=
        parseInt(inputBounds!.right) - 100
      ) {
        addLetters({
          tile: tile,
          deltaPosition: {
            x:
              wordList[wordList.length - 1].deltaPosition.x +
              parseInt(selectedBounds!.width) +
              10,
            y: wordList[wordList.length - 1].deltaPosition.y,
          },
        });
      } else {
        addLetters({ tile: tile, deltaPosition: { x: 0, y: 0 } });
      }
    }
  };

  if (!props.isAuthenticated) {
    return <Redirect to='/login' />;
  } else {
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
              draggableBounds={draggableBounds}
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
              <div className='flex flex-col justify-center'>
                <p className='text-xl font-semibold flex justify-center'>
                  {props.currentBoard.name}
                </p>
                {boardSide ? (
                  <p className='text-lg font-medium flex justify-left'>Front</p>
                ) : (
                  <p className='text-lg font-medium flex justify-left'>Back</p>
                )}
              </div>
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
              handleResetWord={handleResetWord}
              wordList={wordList}
              selectedTile={selectedTile}
              setSelectedTile={handleSetSelected}
              handleSetBounds={handleSetBounds}
              setInputBounds={setInputBounds}
            />
          ) : (
            <BackBoard
              tiles={tiles}
              BoardInput={BoardInput}
              handleResetWord={handleResetWord}
              wordList={wordList}
              selectedTile={selectedTile}
              setSelectedTile={handleSetSelected}
              handleSetBounds={handleSetBounds}
              setInputBounds={setInputBounds}
            />
          )}
        </div>
      </div>
    );
  }
};

export default connector(LearningBoard);
