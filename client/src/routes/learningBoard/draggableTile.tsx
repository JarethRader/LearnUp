import React from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import { TileDisplay } from "./tile";

declare global {
  interface IDraggableTileProps {
    tile: ITile | undefined;

    bounds: IBounds | undefined;
    setSelectedTile: (tile: ITile | undefined) => void;
    handleSetBounds: (bounds: IBounds | undefined) => void;
    draggableBounds:
      | {
          x: string;
          y: string;
        }
      | undefined;
    setDraggableBounds: React.Dispatch<
      React.SetStateAction<
        | {
            x: string;
            y: string;
          }
        | undefined
      >
    >;
    addTile: (tile: ITile) => void;
  }
}

const DraggableTile = (props: IDraggableTileProps) => {
  const [deltaPosition, setDelta] = React.useState({
    x: parseInt(props.bounds!.left) - 4,
    y: parseInt(props.bounds!.top) - 4,
  });

  const handleDrag = (e: DraggableEvent, ui: any) => {
    !hasMoved && toggleHasMoved();
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  const [isClicked, setIsClicked] = React.useState(false);
  const toggleIsClicked = () => setIsClicked(!isClicked);

  const [hasMoved, setHasMoved] = React.useState(false);
  const toggleHasMoved = () => setHasMoved(!hasMoved);

  React.useEffect(() => {
    if (!isClicked && hasMoved) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
      props.setDraggableBounds(undefined);
    }
  }, [isClicked, hasMoved]);

  const handleOnClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    props.tile && props.addTile(props.tile);
    toggleIsClicked();
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isClicked) {
      props.setSelectedTile(undefined);
      props.handleSetBounds(undefined);
      props.setDraggableBounds(undefined);
    }
  };

  const [boundsUpdated, setBoundsUpdated] = React.useState(false);
  const toggleBoundsUpdated = () => {
    setBoundsUpdated(true);
    setTimeout(() => {
      setBoundsUpdated(false);
    }, 200);
  };

  React.useEffect(() => {
    if (!boundsUpdated) {
      props.setDraggableBounds(deltaPosition as any);
      toggleBoundsUpdated();
    }
  }, [deltaPosition]);

  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Draggable
      onMouseDown={toggleIsClicked}
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}
    >
      <div
        onClickCapture={(e) => handleOnClickCapture(e)}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
      >
        <TileDisplay
          tile={props.tile!}
          style={"cursor-move border-fuschia-500"}
        />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
