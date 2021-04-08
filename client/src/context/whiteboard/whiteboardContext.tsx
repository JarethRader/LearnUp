import React from "react";

const reducer = (
  state: WhiteboardState,
  action: WhiteboardAction
): WhiteboardState => {
  switch (action.type) {
    case "SET_SELECTED_TILE":
      return {
        ...state,
        selectedTile: action.payload,
      };
    case "CLEAR_SELECTED_TILE":
      return {
        ...state,
        selectedTile: undefined,
      };
    case "SET_TILELIST":
      return {
        ...state,
        // tileSetName: action.payload.name,
        tileList: action.payload.tiles,
        tileSetRect: action.payload.tileSetRect,
      };
    case "ADD_WHITEBOARD_TILE":
      return {
        ...state,
        whiteboardList: [...state.whiteboardList, action.payload],
      };
    case "REMOVE_WHITEBOARD_TILE":
      return {
        ...state,
        whiteboardList: state.whiteboardList.filter(
          (tile) => tile.uid !== action.payload
        ),
      };
    case "UPDATE_WHITEBOARD_TILE":
      return {
        ...state,
        whiteboardList: state.whiteboardList.map((tile) =>
          tile.uid === action.payload.uid
            ? { ...tile, delta: action.payload.delta }
            : tile
        ),
      };
    case "CLEAR_WHITEBOARD":
      return {
        ...state,
        whiteboardList: [],
      };

    case "ADD_SELECTED":
      return {
        ...state,
        selectedList: [...state.selectedList, action.payload],
      };
    case "REMOVE_SELECTED":
      return {
        ...state,
        selectedList: state.selectedList.filter(
          (tile) => tile.uid !== action.payload
        ),
      };
    case "CLEAR_SELECTED":
      return {
        ...state,
        selectedList: [],
      };
    case "SET_OFFSET":
      return {
        ...state,
        offsetBounds: action.payload,
      };
    default:
      return state;
  }
};

const intialState: WhiteboardState = {
  offsetBounds: {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  },
  selectedTile: undefined,
  tileSetName: "",
  tileSetRect: {
    top: 1,
    left: 1,
    width: 1,
    height: 1,
  },
  tileList: undefined,
  whiteboardList: [],
  selectedList: [],
};

const WhiteboardContext = React.createContext<
  { state: WhiteboardState; dispatch: WhiteboardDispatch } | undefined
>(undefined);

const WhiteboardProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, intialState);

  const value = { state, dispatch };
  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};

function useWhiteboard() {
  const context = React.useContext(WhiteboardContext);
  if (context === undefined) {
    throw new Error("useWhiteboard must be used within a Whiteboard Provider");
  }
  return context;
}

export { WhiteboardProvider, useWhiteboard };
