import React from "react";
import DraggableDisplayTile from "./tiles/DraggableDisplayTile";

import { useWhiteboard } from "../../context/whiteboard/whiteboardContext";

interface Props {}

const Board = (props: any) => {
  const { state, dispatch } = useWhiteboard();

  const WhiteboardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: {
        x: WhiteboardRef.current?.getBoundingClientRect().x,
        y: WhiteboardRef.current?.getBoundingClientRect().y,
        width: WhiteboardRef.current?.getBoundingClientRect().width,
        height: WhiteboardRef.current?.getBoundingClientRect().height,
      },
    });
  }, []);

  return (
    <div
      ref={WhiteboardRef}
      className="flex flex-1 bg-white rounded-xl shadow-xl  border-black border-4 "
    >
      {state.tileList &&
        state.tileList.map((tile: any) => (
          <div className="relative flex h-0 w-0">
            <DraggableDisplayTile tile={tile} />
          </div>
        ))}
    </div>
  );
};

export default Board;
