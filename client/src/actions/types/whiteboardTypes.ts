import {
  UPLOAD_BOARD_SUCCESS,
  UPLOAD_BOARD_FAILURE,
  UPDATE_BOARD_SUCCESS,
  UPDATE_BOARD_FAILURE,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  BOARD_STATE_LOADING,
} from './types';

declare global {
  interface IWhiteboardModel {
    id?: string;
    author?: string;
    audience?: string;
    boardState: IWordList[];
  }

  interface IWhiteboardState {
    author?: string;
    audience?: string;
    boardState: IWordList[];
    whiteboardLoading: boolean;
  }

  interface IWhiteboardInfoObj {
    author?: string;
    audience?: string;
    boardState: IWordList[];
  }

  interface WhiteboardResponse {
    whiteboard: {
      id: string;
      author: string;
      audience: string;
      boardState: IWordList[];
    };
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

  type WhiteboardActionTypes =
    | WhiteboardLoadingAction
    | UpdateBoardActionTypes
    | UploadBoardActionTypes
    | DeleteBoardActionTypes;
}
