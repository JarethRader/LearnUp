import React from 'react';
import { TileComponent } from './tile';

interface Props {
  tiles: any;
  BoardInput: (props: IBoardInputProps) => JSX.Element;
  addLetters: (tile: ITile) => void;
  handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
  word: ITile[];
  setSelectedTile: (tile: ITile | undefined) => void;
  handleSetBounds: (bounds: IBounds | undefined) => void;
}

const FrontBoard = (props: Props) => {
  return (
    <div
      className='h-auto 2xl:w-7/12 xl:10/12 md:w-11/12 border-4 border-black rounded-xl bg-gray-100 shadow-xl p-4'
      style={{
        gridTemplateColumns: '10% 10% 60% 5% 15%',
        gridTemplateRows: '7rem 7rem 25rem 10rem',
      }}>
      <div className='grid justify-center' style={{ gridColumn: '1/6' }}>
        <div className='flex flex-row justify-items-start flex-wrap'>
          {props.tiles.roots.map((tile: ITile, index: number) => (
            <div key={index}>
              <TileComponent
                tile={tile}
                setSelectedTile={props.setSelectedTile}
                handleSetBounds={props.handleSetBounds}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full pt-8 grid grid-cols-12 h-2/3'>
        <div className='col-start-1 col-span-2'>
          <div className='flex flex-wrap 2xl:w-3/4 xl:w-1/2 lg:w-full'>
            {props.tiles.backPrefixes.map((tile: ITile, index: number) => (
              <div key={index}>
                <TileComponent
                  tile={tile}
                  setSelectedTile={props.setSelectedTile}
                  handleSetBounds={props.handleSetBounds}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='grid col-start-3 col-span-8'>
          <div className='grid grid-rows-3'>
            <div className='grid row-start-1 row-span-1'>
              <props.BoardInput
                word={props.word}
                handleResetWord={props.handleResetWord}
              />
            </div>
          </div>
        </div>
        <div className='col-start-11 col-span-2'>
          <div className='flex flex-wrap justify-end items-end'>
            {props.tiles.endings.map((tile: ITile, index: number) => (
              <div key={index}>
                <TileComponent
                  tile={tile}
                  setSelectedTile={props.setSelectedTile}
                  handleSetBounds={props.handleSetBounds}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontBoard;
