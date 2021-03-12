import React from "react";
import { Link, Redirect } from "react-router-dom";
import WhiteboardDraggableTile from "./tiles/WhiteboardDraggableTile";
import WhiteboardDisplayTile from "./tiles/WhiteboardDisplayTile";

import { useWhiteboard } from "../../context/whiteboard/whiteboardContext";

interface Props {}

const frontTileSet = require("../../components/tiles/defaultTileSets/front.json");
const backTileSet = require("../../components/tiles/defaultTileSets/back.json");

const Whiteboard = (props: Props) => {
  const { state, dispatch } = useWhiteboard();

  React.useEffect(() => {
    dispatch({
      type: "SET_TILELIST",
      payload: frontTileSet,
    });
  }, []);

  const flipBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // dispatch({
    //   type: "SET_TILELIST",
    //   payload: backTileSet,
    // });
  };

  const WhiteboardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dispatch({
      type: "SET_OFFSET",
      payload: {
        x: WhiteboardRef.current?.getBoundingClientRect().left || 0,
        y: WhiteboardRef.current?.getBoundingClientRect().top || 0,
        width: WhiteboardRef.current?.getBoundingClientRect().width || 1,
        height: WhiteboardRef.current?.getBoundingClientRect().height || 1,
      },
    });
  }, []);

  return (
    <div>
      <div className="absolute z-20">
        {state.selectedTile && <WhiteboardDraggableTile />}
      </div>
      <div className="w-full min-h-screen flex items-center flex-col bg-gray-300 py-4">
        <div className="w-7/12 flex flex-col">
          <div className="flex self-center">
            <h1 className="text-yellow-500 font-bold text-2xl">
              Learning Board
            </h1>
          </div>
          <div className="flex flex-row justify-around py-2">
            <div className="flex self-center">
              <p className="text-xl font-semibold flex justify-center">
                Board Name
              </p>
            </div>
            <div>
              <button
                onClick={(e) => flipBoard(e)}
                className="px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-600 focus:outline-none text-white font-semibold stroke"
              >
                Flip Board
              </button>
              <Link to="/dashboard">
                <button className="px-4 py-2 mx-1 rounded bg-blue-500 hover:bg-blue-600 focus:outline-none text-white font-semibold stroke">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr className="" />
        <div className="flex flex-1 w-11/12 my-4">
          <div
            ref={WhiteboardRef}
            className="flex flex-1 bg-white rounded-xl shadow-xl  border-black border-4"
          >
            {state.tileList &&
              state.tileList.map((tile: any) => (
                <div className="relative flex h-0 w-0">
                  <WhiteboardDisplayTile tile={tile} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
