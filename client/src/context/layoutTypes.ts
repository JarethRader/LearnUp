export {};

declare global {
  interface TileType {
    letters: string;
    color: string;
  }

  interface LayoutState {
    selectedTile: TileType | undefined;
  }

  type LayoutContextType = {
    tile: TileType | undefined;
    setTile: (tile: TileType) => void;
  };

  interface SetTile {
    type: "SET_TILE";
    payload: TileType;
  }

  interface ClearTile {
    type: "CLEAR_TILE";
  }

  type LayoutActionTypes = SetTile | ClearTile;

  type LayoutDispatch = (action: LayoutActionTypes) => void;
}
