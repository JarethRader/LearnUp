import {
  UPLOAD_BOARD_SUCCESS,
  UPLOAD_BOARD_FAILURE,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAILURE,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  SET_CURRENT_BOARD,
  CLEAR_CURRENT_BOARD,
  BOARD_STATE_LOADING,
} from './types';

declare global {
  interface IWhiteboardModel {
    id?: string;
    name?: string;
    author?: string;
    audience?: string;
    boardState: IWordList[];
  }

  interface IWhiteboardState {
    boardState: IWordList[];
    currentBoard: IWhiteboardModel;
    ownBoards: IWhiteboardModel[];
    sharedBoards: IWhiteboardModel[];
    whiteboardLoading: boolean;
  }

  interface IWhiteboardInfoObj {
    name?: string;
    author?: string;
    audience?: string;
    boardState: IWordList[];
  }

  interface WhiteboardResponse {
    whiteboard: IWhiteboardModel;
  }

  interface GetWhiteboardResponse {
    ownWhiteboards: IWhiteboardModel[];
    sharedWhiteboards: IWhiteboardModel[];
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
    payload: WhiteboardResponse;
  }

  interface UploadBoardFailure {
    type: typeof UPLOAD_BOARD_FAILURE;
    payload?: null;
  }

  type UploadBoardActionTypes = UploadBoardSuccess | UploadBoardFailure;

  // get board states interface
  interface GetBoardSuccess {
    type: typeof GET_BOARD_SUCCESS;
    payload: GetWhiteboardResponse;
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
    | GetBoardActionTypes
    | HandleCurrentBoardActions
    | DeleteBoardActionTypes;
}
