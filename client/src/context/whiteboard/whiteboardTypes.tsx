export {};

declare global {
  interface IWhiteboardOffest {
    x: number | undefined;
    y: number | undefined;
    width: number | undefined;
    height: number | undefined;
  }

  interface WhiteboardState {
    offsetBounds: IWhiteboardOffest;
    boardRect: { width: number | undefined; height: number | undefined };
    tileList: ITileList[] | undefined;
  }

  interface SetTilelist {
    type: "SET_TILELIST";
    payload: {
      pageRect: {
        width: number;
        height: number;
      };
      tiles: ITileList[];
    };
  }

  interface SetOffset {
    type: "SET_OFFSET";
    payload: IWhiteboardOffest;
  }

  type WhiteboardAction = SetOffset | SetTilelist;

  type WhiteboardDispatch = (action: WhiteboardAction) => void;
}
