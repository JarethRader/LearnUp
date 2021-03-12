import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import useMeasure from "react-use-measure";
import Draggable, { DraggableEvent } from "react-draggable";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

interface Props {}

const WhiteboardDraggableDisplayTile = (props: any) => {
  const { state, dispatch } = useWhiteboard();

  const [deltaPosition, setDelta] = React.useState({
    x: props.tile.delta.x,
    y: props.tile.delta.y,
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
      <div className="relative ">
        <TileComponent
          tile={props.tile.tile}
          cursor={"cursor-move"}
          border={"border-yellow-400"}
        />
      </div>
    </Draggable>
  );
};

export default WhiteboardDraggableDisplayTile;
