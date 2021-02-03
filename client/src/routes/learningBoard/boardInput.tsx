import React from 'react';
import { Sound, Erase } from '@styled-icons/entypo';

import DraggableDisplayTile from './draggableDisplayTile';

declare global {
  interface IBoardInputProps {
    handleResetWord: (event: React.MouseEvent<HTMLButtonElement>) => void;
    word: IWordList[];
    setInputBounds: React.Dispatch<React.SetStateAction<IBounds | undefined>>;
  }
}

const BoardInput = (props: IBoardInputProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    ref.current &&
      props.setInputBounds(ref.current.getBoundingClientRect() as any);
  }, []);

  return (
    <div className='flex flex-row'>
      <div
        ref={ref}
        className='border-4 border-black rounded-xl w-5/6 h-5/6 shadow-2xl bg-white overflow-auto'
        style={{
          height: '15vh',
        }}>
        <div className='h-full flex items-start '>
          <div className='flex flex-row flex-wrap relative'>
            {props.word.map((word, index: number) => (
              <div key={index} className='absolute'>
                <DraggableDisplayTile word={word} />
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
