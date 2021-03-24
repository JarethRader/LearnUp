import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../reducers/index";

import {
  uploadHelper,
  updateHelper,
  deleteHelper,
  getHelper,
} from "./functions";

import { WHITEBOARD_BASE, API_SUFFIX, CSRFConfig } from "../utils/config";

const WHITEBOARD_API = WHITEBOARD_BASE + API_SUFFIX;

export const uploadBoard = (
  body: IWhiteboardInfoObj
): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await uploadHelper(body, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "UPLOAD_BOARD_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "UPLOAD_BOARD_FAILURE",
    });
  }
};

export const updateBoard = (
  whiteboardID: string,
  body: IWhiteboardInfoObj
): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await updateHelper(whiteboardID, body, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "UPDATE_BOARD_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "UPDATE_BOARD_FAILURE",
    });
  }
};

export const deleteBoard = (whiteboardID: string): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await deleteHelper(whiteboardID, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "DELETE_BOARD_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "DELETE_BOARD_FAILURE",
    });
  }
};

export const getBoards = (userID: string): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await getHelper(userID, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "GET_BOARD_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "GET_BOARD_SUCCESS",
    });
  }
};

export const setCurrentBoard = (
  board: IWhiteboardModel
): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({
    type: "SET_CURRENT_BOARD",
    payload: board,
  });
};
