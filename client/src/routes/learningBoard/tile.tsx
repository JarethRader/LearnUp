import React from 'react';

declare global {
  interface tileComponentProps {
    tile: ITile;
    addLetters: (letters: ITile) => void;
    style?: string;
  }

  interface tileDisplayProps {
    tile: ITile;
  }
}

export const TileComponent = (props: tileComponentProps) => {
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.addLetters(props.tile);
  };

  return (
    <div className='flex justify-center'>
      <button
        onClick={(e) => handleOnClick(e)}
        className={`px-2 py-1 m-1 text-cente border-4 border-black hover:border-purple-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl focus:outline-none ${
          props.tile.color
        } ${props.style && props.style}`}>
        <p>{props.tile.letters}</p>
      </button>
    </div>
  );
};

export const TileDisplay = (props: tileDisplayProps) => {
  return (
    <div
      className={`px-2 py-1 m-1 text-center border-4 border-black hover:border-purple-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl ${props.tile.color}`}>
      <p>{props.tile.letters}</p>
    </div>
  );
};
