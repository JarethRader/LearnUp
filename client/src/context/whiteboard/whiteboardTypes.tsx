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
    tileSetRect: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    tileList: ITileList[] | undefined;
  }

  interface SetTilelist {
    type: "SET_TILELIST";
    payload: {
      tileSetRect: {
        top: number;
        left: number;
        width: number;
        height: number;
      };
      tiles: ITileList[];
    };
  }

  interface SetBoardOffset {
    type: "SET_OFFSET";
    payload: IWhiteboardOffest;
  }

  type WhiteboardAction = SetBoardOffset | SetTilelist;

  type WhiteboardDispatch = (action: WhiteboardAction) => void;
}
