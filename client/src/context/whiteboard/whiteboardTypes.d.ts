export {};

declare global {
  interface IWhiteboardOffest {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  interface WhiteboardState {
    offsetBounds: IWhiteboardOffest;
    selectedTile: ITileList | undefined;
    tileSetRect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    tileList: ITileList[] | undefined;
    tileSetName: string;
    whiteboardList: ITileList[];
    selectedList: ITileList[];
  }

  interface SetTilelist {
    type: "SET_TILELIST";
    payload: {
      // name: string;
      tileSetRect: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      tiles: ITileList[];
    };
  }

  interface SetSelectedTile {
    type: "SET_SELECTED_TILE";
    payload: ITileList;
  }

  interface ClearSelectedTile {
    type: "CLEAR_SELECTED_TILE";
  }

  interface AddWhiteboardTile {
    type: "ADD_WHITEBOARD_TILE";
    payload: ITileList;
  }

  interface UpdateWhiteboardTile {
    type: "UPDATE_WHITEBOARD_TILE";
    payload: ITileList;
  }

  interface RemoveWhiteboardTile {
    type: "REMOVE_WHITEBOARD_TILE";
    payload: string;
  }

  interface ClearWhiteboard {
    type: "CLEAR_WHITEBOARD";
  }

  interface SetBoardOffset {
    type: "SET_OFFSET";
    payload: IWhiteboardOffest;
  }

  interface AddSelected {
    type: "ADD_SELECTED";
    payload: ITileList;
  }

  interface RemoveSelected {
    type: "REMOVE_SELECTED";
    payload: string; //tile UID
  }

  interface ClearSelected {
    type: "CLEAR_SELECTED";
  }

  type WhiteboardAction =
    | SetBoardOffset
    | SetTilelist
    | SetSelectedTile
    | ClearSelectedTile
    | AddWhiteboardTile
    | UpdateWhiteboardTile
    | RemoveWhiteboardTile
    | ClearWhiteboard
    | AddSelected
    | RemoveSelected
    | ClearSelected;

  type WhiteboardDispatch = (action: WhiteboardAction) => void;
}
