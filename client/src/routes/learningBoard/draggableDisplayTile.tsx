import React from 'react';
import Draggable from 'react-draggable';
import { TileDisplay } from './tile';

declare global {
  interface IDraggableDisplayProps {
    tile: ITile | undefined;
  }
}

const DraggableDisplayTile = (props: IDraggableDisplayProps) => {
  const [deltaPosition, setDelta] = React.useState({
    x: 0,
    y: 0,
  });

  const handleDrag = (e: any, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}>
      <div>
        <TileDisplay tile={props.tile!} style={'border-black cursor-move'} />
      </div>
    </Draggable>
  );
};

export default DraggableDisplayTile;
