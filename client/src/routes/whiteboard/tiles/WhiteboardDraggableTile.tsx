import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";
import { v4 as uuidv4 } from "uuid";

interface Props {
  updateMessage: (msg: any) => void;
  response: any;
}

const WhiteboardDraggableTile = (props: Props) => {
  const { state, dispatch } = useWhiteboard();

  const [deltaPosition, setDelta] = React.useState({
    x: state.selectedTile!.delta.x,
    y: state.selectedTile!.delta.y,
  });

  const handleDrag = (e: DraggableEvent, ui: any) => {
    setDelta({
      x: deltaPosition.x + ui.deltaX,
      y: deltaPosition.y + ui.deltaY,
    });
  };

  const handleOnMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    dispatch({
      type: "CLEAR_SELECTED_TILE",
    });
  };

  const handleOnClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    dispatch({
      type: "ADD_WHITEBOARD_TILE",
      payload: {
        tile_id: state.selectedTile!.tile_id,
        uid: uuidv4(),
        tile: state.selectedTile!.tile,
        delta: {
          x: deltaPosition.x - state.offsetBounds.x,
          y: deltaPosition.y - state.offsetBounds.y,
        },
      },
    });
    dispatch({
      type: "CLEAR_SELECTED_TILE",
    });

    props.updateMessage({
      type: "ADD",
      data: {
        tile_id: state.selectedTile!.tile_id,
        uid: state.selectedTile!.uid,
        tile: state.selectedTile!.tile,
        delta: {
          x: deltaPosition.x - state.offsetBounds.x,
          y: deltaPosition.y - state.offsetBounds.y,
        },
      },
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
      <div
        onClickCapture={(e) => handleOnClickCapture(e)}
        onMouseLeave={(e) => handleOnMouseLeave(e)}
      >
        <TileComponent tile={state.selectedTile!.tile} cursor={"cursor-move"} />
      </div>
    </Draggable>
  );
};

export default WhiteboardDraggableTile;
