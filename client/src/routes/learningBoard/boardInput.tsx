import React from 'react';
import { Sound, Erase } from '@styled-icons/entypo';

import { TileDisplay } from './tile';

declare global {
  interface IBoardInputProps {
    handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
    word: ITile[];
  }
}

const BoardInput = (props: IBoardInputProps) => {
  return (
    <div className='flex flex-row'>
      <div className='border-4 border-black rounded-xl w-5/6 h-5/6 shadow-2xl bg-white'>
        <div className='h-full flex items-start '>
          <div className='flex flex-row flex-wrap'>
            {props.word.map((tile, index: number) => (
              <div key={index}>
                <TileDisplay tile={tile} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div>
          <button
            onClick={(e) => props.handleResetWord(e)}
            className='bg-blue-600 hover:bg-blue-500 m-1 p-1 rounded'>
            <Erase width='32' />
          </button>
        </div>
        <div>
          <button className='bg-yellow-600 hover:bg-yellow-500 m-1 p-1 rounded'>
            <Sound width='32' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardInput;
