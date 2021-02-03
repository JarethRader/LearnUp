import React from 'react';
import Draggable from 'react-draggable'; // The default
import { TileDraggable } from './tile';

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

  interface IDraggableTileProps {
    tile: ITile | undefined;
    bounds: IBounds | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
  }
}

const DraggableTile = (props: IDraggableTileProps) => {
  const [deltaPosition, setDelta] = React.useState({
    x: parseInt(props.bounds!.left) - 4,
    y: parseInt(props.bounds!.top) - 4,
  });

  const handleDrag = (e: any, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  const handleEvent = (
    event: React.MouseEvent<HTMLDivElement>,
    clicked: boolean
  ) => {
    event.preventDefault();
    if (clicked) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
    }
  };

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}>
      <div
        onMouseLeave={(e) => handleEvent(e, false)}
        onClick={(e) => handleEvent(e, true)}>
        <TileDraggable tile={props.tile!} />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
