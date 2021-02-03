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
    x: 0,
    y: 0,
  });

  const handleDrag = (e: any, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  //   React.useEffect(() => {
  //     console.log(deltaPosition);
  //   }, [deltaPosition]);

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}
      positionOffset={{
        x: 50,
        y: '10%',
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
