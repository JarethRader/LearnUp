import React from "react";
import TileComponent from "./tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useLayout } from "../../context/layoutContext";

interface Props {}

const DraggableDisplayTile = (props: any) => {
  const { state } = useLayout();
  console.log(props);
  const [deltaPosition, setDelta] = React.useState({
    x: props.delta.x - (state.offsetBounds.x || 0),
    y: props.delta.y - (state.offsetBounds.y || 0),
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
        <TileComponent tile={props.tile} />
      </div>
    </Draggable>
  );
};

export default DraggableDisplayTile;
