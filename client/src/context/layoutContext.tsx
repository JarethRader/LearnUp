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
    default:
      return state;
  }
};

// State
const initialState: LayoutState = {
  selectedTile: undefined,
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
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayout };
