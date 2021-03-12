import React from "react";
import TileComponent from "../../../components/tiles/tileComponent";
import useMeasure from "react-use-measure";
import { useWhiteboard } from "../../../context/whiteboard/whiteboardContext";

interface Props {}

const WhiteboardDisplayTile = (props: any) => {
  const { state, dispatch } = useWhiteboard();

  const scaleFactor = {
    width: state.offsetBounds.width / state.tileSetRect.width,
    height: state.offsetBounds.height / state.tileSetRect.height,
  };

  const [deltaPosition, setDelta] = React.useState({
    x: props.tile.delta.x * scaleFactor.width,
    y: props.tile.delta.y * scaleFactor.height,
  });

  const handleOnHover = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    dispatch({
      type: "SET_SELECTED_TILE",
      payload: {
        uid: props.tile.uid,
        tile: props.tile.tile,
        delta: {
          x: bounds.x,
          y: bounds.y,
        },
      },
    });
  };

  const [ref, bounds] = useMeasure({});
  React.useEffect(() => {
    console.log(bounds);
  }, [bounds]);

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => handleOnHover(e)}
      className="cursor-pointer relative"
      style={{
        top: `${deltaPosition.y}px`,
        left: `${deltaPosition.x}px`,
      }}
    >
      <TileComponent tile={props.tile.tile} />
    </div>
  );
};

export default WhiteboardDisplayTile;
