import React from 'react';
import Draggable from 'react-draggable'; // The default
import { TileDisplay } from './tile';

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
    x: parseInt(props.bounds!.x),
    y: parseInt(props.bounds!.y),
  });

  const handleDrag = (e: any, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.setSelectedTile(undefined);
    props.handleSetBounds(undefined);
  };

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}>
      <div onMouseLeave={(e) => handleOnMouseLeave(e)}>
        <TileDisplay tile={props.tile!} />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
