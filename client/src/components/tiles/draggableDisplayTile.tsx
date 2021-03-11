import React from "react";
import TileComponent from "./tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useLayout } from "../../context/layout/layoutContext";

interface Props {}

const DraggableDisplayTile = (props: any) => {
  const { state, dispatch } = useLayout();
  const [deltaPosition, setDelta] = React.useState({
    x: props.tile.delta.x - (state.offsetBounds.x || 0),
    y: props.tile.delta.y - (state.offsetBounds.y || 0),
  });
  const handleDrag = (e: DraggableEvent, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });

    const updatedTile = {
      ...props.tile,
      delta: {
        x: deltaPosition.x + ui.deltaX + (state.offsetBounds.x || 0),
        y: deltaPosition.y + ui.deltaY + (state.offsetBounds.y || 0),
      },
    };
    dispatch({
      type: "UPDATE_TILE",
      payload: updatedTile,
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
