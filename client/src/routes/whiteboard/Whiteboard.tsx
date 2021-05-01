import React from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { SelectableGroup, DeselectAll } from "react-selectable-fast";
import { Trash, Sound } from "@styled-icons/entypo";

import WhiteboardDraggableTile from "./tiles/WhiteboardDraggableTile";
import WhiteboardDisplayTile from "./tiles/WhiteboardDisplayTile";
import WhiteboardSelectableTile from "./tiles/WhiteboardSelectableTile";

import ErrorModal from "./utils/errorModal";

import { useWhiteboard } from "../../context/whiteboard/whiteboardContext";
import {
  MessageConsumer,
  ResponseConsumer,
} from "../../context/connection/connectionContext";

import {
  updateBoard,
  getBoard,
} from "../../actions/whiteboardAPI/whiteboardActions";

import { clearErrors } from "../../actions/errorActions/errorActions";

import { playAudio } from "../../actions/audioAPI/audioActions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const debounce = (
  update: (whiteboardID: string, body: IWhiteboardEditObj) => void,
  timeout = 3000
) => {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(() => {
      update.apply(this, args);
    }, timeout);
  };
};

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
  audio: state.audio.audio,
  error: state.error.errors,
});

const mapDispatchToProps = {
  updateBoard,
  getBoard,
  playAudio,
  clearErrors,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & props;

const Whiteboard = (props: Props) => {
  const { state, dispatch } = useWhiteboard();
  const whiteboardID = useQuery().get("id");

  // handle errors
  const [showError, setError] = React.useState(false);
  const toggleErrorModal = () => setError(!showError);
  React.useEffect(() => {
    props.error.type === "whiteboard" && toggleErrorModal();
  }, [props.error]);

  const [localResponse, setLocalResponse] = React.useState<any>({});
  React.useEffect(() => {
    switch (localResponse.type) {
      case "ADD":
        dispatch({
          type: "ADD_WHITEBOARD_TILE",
          payload: localResponse.data,
        });
        break;
      case "FLIP":
        flipBoard();
        break;
      default:
        break;
    }
  }, [localResponse]);

  React.useEffect(() => {
    if (whiteboardID) {
      props.getBoard(whiteboardID);
    } else {
      console.log("Whiteboard doesnt exist");
    }
  }, []);

  const [boardSide, setBoardSide] = React.useState(false);
  React.useEffect(() => {
    dispatch({
      type: "SET_TILELIST",
      payload: {
        tileSetRect: props.currentBoard.layouts[0].boundingRect,
        tiles: props.currentBoard.layouts[0].tiles,
      },
    });

    // NOTE
    // for some reason the "ADD_WHITEBOARD_TILES" will add duplicates of the tiles from the redux store to the page
    // for now my solution is to just the context before adding the tiles from the redux store
    // This useEffect block should only be running whenever the whiteboard_id changes, which is intial load and should only happen once, but that doesn't seem to be the case
    dispatch({
      type: "CLEAR_WHITEBOARD",
    });
    props.currentBoard.tiles.forEach((tile) => {
      dispatch({
        type: "ADD_WHITEBOARD_TILE",
        payload: {
          tile_id: tile.tile_id,
          uid: tile.uid,
          tile: tile.tile,
          delta: tile.delta,
        },
      });
    });
  }, [props.currentBoard.whiteboard_id]);

  const flipBoard = () => {
    setBoardSide(!boardSide);
    dispatch({
      type: "SET_TILELIST",
      payload: {
        tileSetRect: props.currentBoard.layouts[boardSide ? 0 : 1].boundingRect,
        tiles: props.currentBoard.layouts[boardSide ? 0 : 1].tiles,
      },
    });
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

  // I need to look into how this autosave works and make sure its working how I expect it to be
  const autosave = React.useCallback(
    debounce(
      (newWhiteboard) =>
        // @ts-ignore
        props.updateBoard(props.currentBoard.whiteboard_id, newWhiteboard),
      60000
    ),
    []
  );

  React.useEffect(() => {
    const newWhiteboard = {
      tiles: state.whiteboardList,
    };

    // TODO: the whiteboard readding multiple instances of the same tile seems to be coming from the frontend, the whiteboardList in the context API has the same tiles added periodically
    props.isAuthenticated && autosave(newWhiteboard);
  }, [state.whiteboardList]);

  const handlePlayAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.playAudio(state.selectedList);
  };

  const play = React.useCallback(async () => {
    if (props.audio) {
      const audioBlob = new Blob([props.audio as BlobPart], {
        type: "audio/mpeg",
      });
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.play();
    }
  }, [props.audio]);

  React.useEffect(() => {
    play();
  }, [play]);

  return (
    <div>
      {showError && (
        <div className="absolute w-full min-h-screen flex justify-center items-center z-20">
          <div className="absolute w-full min-h-screen bg-gray-500 opacity-25"></div>
          <div className="opacity z-30">
            <ErrorModal error={props.error} clearErrors={clearErrors} />
          </div>
        </div>
      )}
      <MessageConsumer>
        {({ message, updateMessage }) => (
          <ResponseConsumer>
            {({ response, updateResponse }) => {
              setLocalResponse(response);
              return (
                <div>
                  <div className="absolute z-20">
                    {state.selectedTile && (
                      <WhiteboardDraggableTile
                        updateMessage={updateMessage}
                        response={response}
                      />
                    )}
                  </div>
                  <div className="w-full min-h-screen flex items-center flex-col bg-gray-300 py-4">
                    <div className="w-7/12 flex flex-col">
                      <div className="grid grid-cols-3">
                        <div className="flex self-center">
                          <p className="text-xl font-semibold flex justify-center">
                            {props.currentBoard.boardName}
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
                            onClick={() => {
                              flipBoard();
                              updateMessage({
                                type: "FLIP",
                              });
                            }}
                            className="px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-700 focus:outline-none text-white font-semibold stroke"
                          >
                            Flip Board
                          </button>
                          {/* TODO: The currentBoard variable in the whiteboard redux store needs to be clears when we navigate back to the dashboard. RN it doesn't load up new boards when we change a different board from the dashboard */}
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
                          <button
                            onClick={(e) => handlePlayAudio(e)}
                            className="px-4 py-2 mx-1 rounded bg-yellow-500 hover:bg-yellow-700 focus:outline-none text-white font-semibold stroke flex items-center items-row"
                          >
                            <h1 className="pr-1">Play</h1>
                            <Sound size="20" className="text-black" />
                          </button>
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
                              <WhiteboardDisplayTile
                                tile={tile}
                                updateMessage={updateMessage}
                                response={response}
                              />
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
                              <WhiteboardSelectableTile
                                tile={tile}
                                updateMessage={updateMessage}
                                response={response}
                              />
                            </div>
                          ))}
                        </SelectableGroup>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          </ResponseConsumer>
        )}
      </MessageConsumer>
    </div>
  );
};

export default connector(Whiteboard);
