/**
 * @desc Create state store for Layout Component using the React Context API
 */
import React from "react";

// Reducer
const reducer = (
  state: LayoutState,
  action: LayoutActionTypes
): LayoutState => {
  switch (action.type) {
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
    default:
      return state;
  }
};

// State
const initialState: LayoutState = {
  selectedTile: undefined,
  selectedBounds: {
    x: undefined,
    y: undefined,
  },
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
