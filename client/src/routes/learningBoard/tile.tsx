import React from 'react';
import useMeasure from 'react-use-measure';

declare global {
  interface tileComponentProps {
    tile: ITile;
    // addLetters: (letters: ITile) => void;
    style?: string;
    selectedTile: ITile | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
  }

  interface tileDisplayProps {
    tile: ITile;
  }
}

export const TileComponent = (props: tileComponentProps) => {
  const handleEvent = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    !props.selectedTile && props.setSelectedTile(props.tile);
    !props.selectedTile && props.handleSetBounds(bounds as any);
  };

  const [ref, bounds] = useMeasure({});

  return (
    <div className='flex justify-center'>
      <div
        ref={ref}
        onMouseEnter={(e) => handleEvent(e)}
        onTouchEndCapture={(e) => handleEvent(e)}
        className={`px-2 py-1 m-1 text-center border-4 border-black hover:border-fuschia-500 cursor-pointer rounded-lg text-lg font-semibold shadow-xl focus:outline-none ${
          props.tile.color
        } ${props.style && props.style}`}>
        <p>{props.tile.letters}</p>
      </div>
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

export const TileDraggable = (props: tileDisplayProps) => {
  return (
    <div
      className={`px-2 py-1 m-1 text-center border-4 border-fuschia-500 cursor-move rounded-lg text-lg font-semibold shadow-xl ${props.tile.color}`}>
      <p>{props.tile.letters}</p>
    </div>
  );
};
