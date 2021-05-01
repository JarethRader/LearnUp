import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../reducers/index";

import { returnErrors } from "../errorActions/errorActions";

import {
  uploadHelper,
  updateHelper,
  deleteHelper,
  getHelper,
  getWhiteboardHelper,
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
  body: IWhiteboardEditObj
): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  console.log("Updating board");
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

export const getUserBoards = (userID: string): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await getHelper(userID, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        const ownWhiteboards =
          response.ownWhiteboards.length > 0
            ? response.ownWhiteboards.map((whiteboard) => ({
                whiteboard_id: whiteboard.w_id,
                boardName: whiteboard.bn,
                author: whiteboard.ar,
                audience: whiteboard.au,
              }))
            : [];

        const sharedWhiteboards =
          response.sharedWhiteboards.length > 0
            ? response.sharedWhiteboards.map((whiteboard) => ({
                whiteboard_id: whiteboard.w_id,
                boardName: whiteboard.bn,
                author: whiteboard.ar,
                audience: whiteboard.au,
              }))
            : [];
        const payload = {
          ownWhiteboards,
          sharedWhiteboards,
        };

        dispatch({
          type: "GET_USER_BOARD_SUCCESS",
          payload,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "GET_USER_BOARD_FAILURE",
    });
  }
};

export const getBoard = (whiteboardID: string): WhiteboardThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "BOARD_STATE_LOADING" });
  try {
    await getWhiteboardHelper(whiteboardID, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "GET_BOARD_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors("whiteboard", err.error, 400));
    dispatch({
      type: "GET_BOARD_FAILURE",
    });
  }
};
