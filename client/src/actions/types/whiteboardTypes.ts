import {
  UPLOAD_BOARD_SUCCESS,
  UPLOAD_BOARD_FAILURE,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  GET_USER_BOARD_SUCCESS,
  GET_USER_BOARD_FAILURE,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  SET_CURRENT_BOARD,
  CLEAR_CURRENT_BOARD,
  BOARD_STATE_LOADING,
} from "./types";

declare global {
  interface IWhiteboardModel {
    whiteboard_id: string;
    boardName: string;
    author: string;
    audience: string;
  }

  interface IFullBoard extends IWhiteboardModel {
    tiles: ITileList[];
    layout: {
      layout_id: string;
      boundingRect: {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      tiles: ITileList[];
    };
  }

  interface IWhiteboardState {
    currentBoard: IFullBoard;
    ownBoards: IWhiteboardModel[];
    sharedBoards: IWhiteboardModel[];
    whiteboardLoading: boolean;
  }

  interface IWhiteboardInfoObj {
    name?: string;
    author?: string;
    audience?: string;
  }

  interface IWhiteboardEditObj {
    name?: string;
    author?: string;
    audience?: string;
  }

  interface WhiteboardResponse {
    w_id: string;
    bn: string;
    ar: string;
    au: string;
    createdAt: string;
    updatedAt: string;
  }

  interface TileResponse {
    c_id: string;
    p_id: string;
    t_id: string;
    dx: number;
    dy: number;
    createdAt: string;
    updatedAt: string;
    Tile: {
      t_id: string;
      l: string;
      c: string;
    };
  }

  interface FullboardResponse extends WhiteboardResponse {
    Layout: {
      l_id: string;
      bx: number;
      by: number;
      bw: number;
      bh: number;
      createdAt: string;
      updatedAt: string;
      Layout_Tiles: TileResponse[];
    };
    Whiteboard_Tiles: TileResponse[];
  }

  interface GetWhiteboardResponse {
    ownWhiteboards: WhiteboardResponse[];
    sharedWhiteboards: WhiteboardResponse[];
  }

  interface WhiteboardLoadingAction {
    type: typeof BOARD_STATE_LOADING;
    payload?: null;
  }

  // Update Board state interface
  interface UpdateBoardSuccess {
    type: typeof UPDATE_BOARD_SUCCESS;
    payload: WhiteboardResponse;
  }

  interface UpdateBoardFailure {
    type: typeof UPDATE_BOARD_FAILURE;
    payload?: null;
  }

  type UpdateBoardActionTypes = UpdateBoardSuccess | UpdateBoardFailure;

  // Upload new board state interface
  interface UploadBoardSuccess {
    type: typeof UPLOAD_BOARD_SUCCESS;
    payload: null;
  }

  interface UploadBoardFailure {
    type: typeof UPLOAD_BOARD_FAILURE;
    payload?: null;
  }

  type UploadBoardActionTypes = UploadBoardSuccess | UploadBoardFailure;

  // get board states interface
  interface GetUserBoardSuccess {
    type: typeof GET_USER_BOARD_SUCCESS;
    payload: GetWhiteboardResponse;
  }

  interface GetUserBoardFailure {
    type: typeof GET_USER_BOARD_FAILURE;
    payload?: null;
  }

  type GetUserBoardActionTypes = GetUserBoardSuccess | GetUserBoardFailure;

  // get board states interface
  interface GetBoardSuccess {
    type: typeof GET_BOARD_SUCCESS;
    payload: { whiteboard: FullboardResponse };
  }

  interface GetBoardFailure {
    type: typeof GET_BOARD_FAILURE;
    payload?: null;
  }

  type GetBoardActionTypes = GetBoardSuccess | GetBoardFailure;

  // Upload new board state interface
  interface DeleteBoardSuccess {
    type: typeof DELETE_BOARD_SUCCESS;
    payload: WhiteboardResponse;
  }

  interface DeleteBoardFailure {
    type: typeof DELETE_BOARD_FAILURE;
    payload?: null;
  }

  type DeleteBoardActionTypes = DeleteBoardSuccess | DeleteBoardFailure;

  interface SetCurrentBoard {
    type: typeof SET_CURRENT_BOARD;
    payload: IWhiteboardModel;
  }

  interface clearCurrentBoard {
    type: typeof CLEAR_CURRENT_BOARD;
    payload?: null;
  }

  type HandleCurrentBoardActions = SetCurrentBoard | clearCurrentBoard;

  type WhiteboardActionTypes =
    | WhiteboardLoadingAction
    | UpdateBoardActionTypes
    | UploadBoardActionTypes
    | GetUserBoardActionTypes
    | GetBoardActionTypes
    | HandleCurrentBoardActions
    | DeleteBoardActionTypes;
}
