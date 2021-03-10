import React from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import TileComponent from "./tileComponent";

const DraggableTile = (props: any) => {
  const [deltaPosition, setDelta] = React.useState({
    x: 0,
    y: 0,
  });

  const handleDrag = (e: DraggableEvent, ui: any) => {
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
    >
      <div>
        <TileComponent
          tile={props.tile!}
          style={"cursor-move border-fuschia-500"}
        />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
