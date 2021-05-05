import React from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import TileComponent from "../../../components/tiles/tileComponent";
import { useLayout } from "../../../context/layout/layoutContext";

import { v4 as uuidv4 } from "uuid";

const DraggableTile = (props: any) => {
  const { state, dispatch } = useLayout();

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

  const draggableRef = React.useRef<HTMLDivElement>(null);

  const handleOnClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: "ADD_TILE",
      payload: {
        uid: uuidv4(),
        tile_id: props.tile_id,
        tile: props.tile,
        delta: {
          x:
            draggableRef.current?.getBoundingClientRect().x! -
            (state.offsetBounds.x || 0),
          y:
            draggableRef.current?.getBoundingClientRect().y! -
            (state.offsetBounds.y || 0),
        },
      },
    });
    props.closeModal(event);
  };

  return (
    <Draggable
      onDrag={handleDrag}
      defaultPosition={{
        x: deltaPosition.x,
        y: deltaPosition.y,
      }}
    >
      <div ref={draggableRef} onClickCapture={(e) => handleOnClickCapture(e)}>
        <TileComponent
          tile={props.tile!}
          style={"cursor-move border-fuschia-500"}
        />
      </div>
    </Draggable>
  );
};

export default DraggableTile;
