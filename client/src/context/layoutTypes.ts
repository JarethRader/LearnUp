export {};

declare global {
  interface TileType {
    letters: string;
    color: string;
  }

  interface ILayoutBounds {
    x: number | undefined;
    y: number | undefined;
  }

  interface ITileList {
    uid: number;
    tile: TileType;
    delta: {
      x: number;
      y: number;
    };
  }

  interface LayoutState {
    selectedTile: TileType | undefined;
    selectedBounds: ILayoutBounds;
    tileList: ITileList[];
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

  interface AddTile {
    type: "ADD_TILE";
    payload: ITileList;
  }

  interface RemoveTile {
    type: "REMOVE_TILE";
    payload: number;
  }

  type LayoutActionTypes = SetTile | ClearTile | AddTile | RemoveTile;

  type LayoutDispatch = (action: LayoutActionTypes) => void;
}
