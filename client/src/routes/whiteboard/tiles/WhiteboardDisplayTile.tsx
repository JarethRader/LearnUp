import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import useMeasure from "react-use-measure";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

interface Props {
  tile: ITileList;
  updateMessage: (msg: any) => void;
  response: any;
}

const WhiteboardDisplayTile = (props: Props) => {
  const { state, dispatch } = useWhiteboard();

  const handleOnHover = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: "CLEAR_SELECTED_TILE",
    });

    const timer = setTimeout(() => {
      dispatch({
        type: "SET_SELECTED_TILE",
        payload: {
          tile_id: props.tile.tile_id,
          uid: props.tile.uid,
          tile: props.tile.tile,
          delta: {
            x: bounds.x,
            y: bounds.y,
          },
        },
      });
    }, 50);
    return () => clearTimeout(timer);
  };

  const [ref, bounds] = useMeasure({});

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => handleOnHover(e)}
      className="cursor-pointer relative"
      style={{
        top: `${
          (props.tile.delta.y * state.offsetBounds.height) /
          state.tileSetRect.height
        }px`,
        left: `${
          (props.tile.delta.x * state.offsetBounds.width) /
          state.tileSetRect.width
        }px`,
      }}
    >
      <TileComponent tile={props.tile.tile} />
    </div>
  );
};

export default WhiteboardDisplayTile;
