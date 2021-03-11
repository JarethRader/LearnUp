export {};

declare global {
  interface ILayoutBounds {
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;
  }

  interface LayoutState {
    offsetBounds: ILayoutBounds;
    selectedTile: TileType | undefined;
    tileList: ITileList[];
  }

  interface SetOffset {
    type: "SET_OFFSET";
    payload: ILayoutBounds;
  }

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
    payload: string;
  }

  interface UpdateTile {
    type: "UPDATE_TILE";
    payload: ITileList;
  }

  type LayoutAction =
    | SetOffset
    | SetTile
    | ClearTile
    | AddTile
    | RemoveTile
    | UpdateTile;

  type LayoutDispatch = (action: LayoutAction) => void;
}
