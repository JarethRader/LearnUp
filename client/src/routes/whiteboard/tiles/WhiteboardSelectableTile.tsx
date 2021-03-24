import React from "react";
import { createSelectable, TSelectableItemProps } from "react-selectable-fast";
import TileComponent from "../../../components/tiles/tileComponent";
import Draggable, { DraggableEvent } from "react-draggable";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

type TSelectableTileProps = {
  tile: ITileList;
};

const WhiteboardSelectableTile = createSelectable<TSelectableTileProps>(
  (props: TSelectableItemProps & TSelectableTileProps) => {
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

    React.useEffect(() => {
      props.isSelected
        ? dispatch({
            type: "ADD_SELECTED",
            payload: props.tile,
          })
        : dispatch({
            type: "REMOVE_SELECTED",
            payload: props.tile.uid,
          });
    }, [props.isSelected]);

    const [isMouseClicked, setClicked] = React.useState(false);
    const toggleClicked = () => setClicked(!isMouseClicked);

    React.useEffect(() => {
      deltaPosition.y < 0 && !isMouseClicked
        ? dispatch({
            type: "REMOVE_WHITEBOARD_TILE",
            payload: props.tile.uid,
          })
        : dispatch({
            type: "UPDATE_WHITEBOARD_TILE",
            payload: {
              ...props.tile,
              delta: deltaPosition,
            },
          });
    }, [deltaPosition, isMouseClicked]);

    return (
      <Draggable
        //   bounds="parent"
        onMouseDown={toggleClicked}
        // @ts-ignore
        onStop={toggleClicked}
        onDrag={handleDrag}
        defaultPosition={{
          x: deltaPosition.x,
          y: deltaPosition.y,
        }}
      >
        <div ref={props.selectableRef}>
          <TileComponent
            tile={props.tile.tile}
            cursor={"cursor-move"}
            border={props.isSelected ? "border-green-400" : "border-yellow-400"}
          />
        </div>
      </Draggable>
    );
  }
);

export default WhiteboardSelectableTile;
