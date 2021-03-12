import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

interface Props {}

const WhiteboardDraggableDisplayTile = (props: any) => {
  const { state, dispatch } = useWhiteboard();

  const scaleFactor = {
    width: state.offsetBounds.width / state.tileSetRect.width,
    height: state.offsetBounds.height / state.tileSetRect.height,
  };

  const [deltaPosition, setDelta] = React.useState({
    x: props.tile.delta.x * scaleFactor.width,
    y: props.tile.delta.y * scaleFactor.height,
  });

  const handleDrag = (e: DraggableEvent, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  return (
    <Draggable
      //   bounds="parent"
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}
    >
      <div>
        <TileComponent tile={props.tile.tile} />
      </div>
    </Draggable>
  );
};

export default WhiteboardDraggableDisplayTile;
