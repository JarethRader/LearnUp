import React from 'react';
import useMeasure from 'react-use-measure';

declare global {
  interface tileComponentProps {
    tile: ITile;
    // addLetters: (letters: ITile) => void;
    style?: string;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
  }

  interface tileDisplayProps {
    tile: ITile;
  }
}

export const TileComponent = (props: tileComponentProps) => {
  // const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   // props.addLetters(props.tile);
  // };

  const handleOnMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setSelectedTile(props.tile);
    props.handleSetBounds(bounds as any);
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setSelectedTile(undefined);
    props.handleSetBounds(undefined);
  };

  const [ref, bounds] = useMeasure({});
  // console.log(ref);

  return (
    <div className='flex justify-center' ref={ref}>
      <button
        onMouseEnter={(e) => handleOnMouseEnter(e)}
        // onMouseLeave={(e) => handleOnMouseLeave(e)}
        // onClick={(e) => handleOnClick(e)}
        className={`px-2 py-1 m-1 text-cente border-4 border-black hover:border-fuschia-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl focus:outline-none ${
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
