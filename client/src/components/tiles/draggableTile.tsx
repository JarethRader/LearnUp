import React from "react";
import Draggable, { DraggableEvent } from "react-draggable";
import TileComponent from "./tileComponent";
import { useLayout } from "../../context/layoutContext";

const DraggableTile = (props: any) => {
  const { dispatch } = useLayout();

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
    event.preventDefault();
    dispatch({
      type: "ADD_TILE",
      payload: {
        uid: 0,
        tile: props.tile,
        delta: {
          x: draggableRef.current?.getBoundingClientRect().x!,
          y: draggableRef.current?.getBoundingClientRect().y!,
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
