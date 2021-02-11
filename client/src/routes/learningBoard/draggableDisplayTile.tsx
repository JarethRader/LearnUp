import React from 'react';
import Draggable from 'react-draggable';
import { TileDisplay } from './tile';

declare global {
  interface IDraggableDisplayProps {
    word: IWordList | undefined;
  }
}

const DraggableDisplayTile = (props: IDraggableDisplayProps) => {
  const [deltaPosition, setDelta] = React.useState({
    x: props.word?.deltaPosition.x || 0,
    y: props.word?.deltaPosition.y || 0,
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
      }}
      grid={[5, 50]}>
      <div className='flex justify-center'>
        <TileDisplay
          tile={props.word!.tile}
          style={'border-black cursor-move'}
        />
      </div>
    </Draggable>
  );
};

export default DraggableDisplayTile;
