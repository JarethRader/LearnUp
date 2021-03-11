/**
 * @desc Create state store for Layout Component using the React Context API
 */
import React from "react";

// Reducer
const reducer = (state: LayoutState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case "SET_OFFSET":
      return {
        ...state,
        offsetBounds: action.payload,
      };
    case "SET_TILE":
      return {
        ...state,
        selectedTile: action.payload,
      };
    case "CLEAR_TILE":
      return {
        ...state,
        selectedTile: undefined,
      };
    case "ADD_TILE":
      return {
        ...state,
        tileList: [...state.tileList, action.payload],
      };
    case "REMOVE_TILE":
      return {
        ...state,
        tileList: state.tileList.filter((tile) => tile.uid !== action.payload),
      };
    case "UPDATE_TILE":
      return {
        ...state,
        tileList: state.tileList.map((tile) => {
          if (tile.uid === action.payload.uid)
            return Object.assign({}, tile, action.payload);
          return tile;
        }),
      };
    default:
      return state;
  }
};

// State
const initialState: LayoutState = {
  offsetBounds: {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
  },
  selectedTile: undefined,
  tileList: [],
};

// Context
const LayoutContext = React.createContext<
  { state: LayoutState; dispatch: LayoutDispatch } | undefined
>(undefined);

const LayoutProvider: React.FC = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

function useLayout() {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a Layout Provider");
  }
  return context;
}

export { LayoutProvider, useLayout };
