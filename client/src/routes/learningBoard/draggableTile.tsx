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

  const [isClicked, setIsClicked] = React.useState(false);
  const toggleIsClicked = () => setIsClicked(!isClicked);

  React.useEffect(() => {
    if (isClicked) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
    }
  }, [isClicked]);

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClicked) {
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
        onClick={toggleIsClicked}
        onClickCapture={toggleIsClicked}
        onMouseLeave={(e) => handleOnMouseLeave(e)}>
        <TileDraggable tile={props.tile!} />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
