import React from "react";

const reducer = (
  state: WhiteboardState,
  action: WhiteboardAction
): WhiteboardState => {
  switch (action.type) {
    case "SET_TILELIST":
      console.log(action.payload);
      return {
        ...state,
        tileList: action.payload.tiles,
        boardRect: action.payload.pageRect,
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
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
  },
  boardRect: {
    width: undefined,
    height: undefined,
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
