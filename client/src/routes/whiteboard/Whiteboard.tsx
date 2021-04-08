import React from "react";
import { Link, Redirect } from "react-router-dom";
import { SelectableGroup, DeselectAll } from "react-selectable-fast";
import { Trash } from "@styled-icons/entypo";

import WhiteboardDraggableTile from "./tiles/WhiteboardDraggableTile";
import WhiteboardDisplayTile from "./tiles/WhiteboardDisplayTile";
import WhiteboardSelectableTile from "./tiles/WhiteboardSelectableTile";

import { useWhiteboard } from "../../context/whiteboard/whiteboardContext";

import {
  updateBoard,
  getBoard,
} from "../../actions/whiteboardAPI/whiteboardActions";

const frontTileSet = require("../../components/tiles/defaultTileSets/front.json");
const backTileSet = require("../../components/tiles/defaultTileSets/back.json");

interface props {
  Navbar: (props: any) => JSX.Element;
  whiteboard_id: string;
}

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/index";

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  currentBoard: state.whiteboard.currentBoard,
  whiteboardLoading: state.whiteboard.whiteboardLoading,
});

const mapDispatchToProps = {
  updateBoard,
  getBoard,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & props;

const Whiteboard = (props: Props) => {
  const { state, dispatch } = useWhiteboard();

  React.useEffect(() => {
    console.log(props.currentBoard.layout.tiles);
    dispatch({
      type: "SET_TILELIST",
      payload: props.currentBoard.layout.tiles,
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

  const handleClearBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch({
      type: "CLEAR_WHITEBOARD",
    });

    dispatch({
      type: "CLEAR_SELECTED",
    });
  };

  return (
    <div>
      <div className="absolute z-20">
        {state.selectedTile && <WhiteboardDraggableTile />}
      </div>
      <div className="w-full min-h-screen flex items-center flex-col bg-gray-300 py-4">
        <div className="w-7/12 flex flex-col">
          <div className="grid grid-cols-3">
            <div className="flex self-center">
              <p className="text-xl font-semibold flex justify-center">
                Board Name
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-yellow-500 font-bold text-2xl">
                Learning Board
              </h1>
            </div>
          </div>
          <div className="flex flex-row justify-center py-2">
            <div className="flex flex-row">
              <button
                onClick={(e) => flipBoard(e)}
                className="px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-700 focus:outline-none text-white font-semibold stroke"
              >
                Flip Board
              </button>
              <Link to="/dashboard">
                <button className="px-4 py-2 mx-1 rounded bg-blue-500 hover:bg-blue-700 focus:outline-none text-white font-semibold stroke">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={(e) => handleClearBoard(e)}
                className="px-4 py-2 mx-1 rounded bg-red-500 hover:bg-red-700 focus:outline-none text-white font-semibold stroke"
              >
                Clear Board
              </button>
              <div className="border-4 border-black rounded-md py-1 px-12 bg-white">
                <Trash size="24" />
              </div>
            </div>
          </div>
        </div>
        <hr className="" />
        <div className="flex flex-1 w-11/12 my-4">
          <div
            ref={WhiteboardRef}
            className="flex flex-1 bg-white rounded-xl shadow-xl  border-black border-4 z-10"
          >
            {state.tileList &&
              state.tileList.map((tile: any) => (
                <div className="relative flex h-0 w-0 z-10">
                  <WhiteboardDisplayTile tile={tile} />
                </div>
              ))}
            <SelectableGroup
              className="main w-full h-full relative z-0"
              enableDeselect={true}
              tolerance={0}
              deselectOnEsc={true}
              allowClickWithoutSelected={false}
              selectOnClick={false}
              allowCtrlClick={true}
              resetOnStart={true}
            >
              {state.whiteboardList.map((tile: any) => (
                <div className="relative flex h-0 w-0">
                  <WhiteboardSelectableTile tile={tile} />
                </div>
              ))}
            </SelectableGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(Whiteboard);
