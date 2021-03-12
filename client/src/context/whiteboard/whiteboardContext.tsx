import React from "react";

const reducer = (
  state: WhiteboardState,
  action: WhiteboardAction
): WhiteboardState => {
  switch (action.type) {
    case "SET_TILELIST":
      return {
        ...state,
        tileList: action.payload.tiles,
        tileSetRect: action.payload.tileSetRect,
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
  tileSetRect: {
    top: 1,
    left: 1,
    width: 1,
    height: 1,
  },
  tileList: undefined,
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
