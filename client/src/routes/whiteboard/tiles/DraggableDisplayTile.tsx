import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

interface Props {}

const DraggableDisplayTile = (props: any) => {
  const { state, dispatch } = useWhiteboard();

  const [deltaPosition, setDelta] = React.useState({
    x: props.tile.delta.x - (state.offsetBounds.x || 0),
    y: props.tile.delta.y - (state.offsetBounds.y || 0),
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

export default DraggableDisplayTile;
