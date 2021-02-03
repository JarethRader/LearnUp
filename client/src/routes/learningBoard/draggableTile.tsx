import React from 'react';
import Draggable from 'react-draggable';
import { TileDisplay } from './tile';

declare global {
  interface IDraggableTileProps {
    tile: ITile | undefined;

    bounds: IBounds | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
    setDraggableBounds: React.Dispatch<
      React.SetStateAction<
        | {
            x: string;
            y: string;
          }
        | undefined
      >
    >;
    addTile: (tile: IWordList) => void;
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

  const [isClicked, setIsClicked] = React.useState(false);
  const toggleIsClicked = () => setIsClicked(!isClicked);
  React.useEffect(() => {
    if (isClicked) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
      props.setDraggableBounds(undefined);
    }
  }, [isClicked]);

  const handleOnClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.tile &&
      props.addTile({ tile: props.tile, deltaPosition: { x: 0, y: 0 } });
    toggleIsClicked();
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isClicked) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
      props.setDraggableBounds(undefined);
    }
  };

  const [isMoving, setMoving] = React.useState(false);
  const ToggleIsMoving = () => setMoving(!isMoving);
  const handleOnTouchEndCapture = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isMoving) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
      props.setDraggableBounds(undefined);
      ToggleIsMoving();
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      props.setDraggableBounds(deltaPosition as any);
    }, 10);
    // return clearInterval(timer);
  }, [deltaPosition]);

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}>
      <div
        onClickCapture={(e) => {
          handleOnClickCapture(e);
        }}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
        onTouchMove={ToggleIsMoving}
        onTouchEndCapture={(e) => handleOnTouchEndCapture(e)}>
        <TileDisplay
          tile={props.tile!}
          style={'cursor-move border-fuschia-500'}
        />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
