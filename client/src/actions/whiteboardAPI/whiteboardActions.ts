import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../../reducers/index';

import { uploadHelper, updateHelper, deleteHelper } from './functions';

import { WHITEBOARD_BASE, API_SUFFIX, CSRFConfig } from '../utils/config';

const WHITEBOARD_API = WHITEBOARD_BASE + API_SUFFIX;

export const uploadBoard = (body: IWhiteboardInfoObj): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: 'BOARD_STATE_LOADING' });
  try {
    await uploadHelper(body, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: 'UPLOAD_BOARD_SUCCESS',
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: 'UPLOAD_BOARD_FAILURE',
    });
  }
};

export const updateBoard = (
  body: IWhiteboardInfoObj,
  whiteboardID: string
): UserThunk => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  try {
    await updateHelper(whiteboardID, body, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: 'UPDATE_BOARD_SUCCESS',
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: 'UPDATE_BOARD_FAILURE',
    });
  }
};

export const deleteBoard = (whiteboardID: string): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    await deleteHelper(whiteboardID, WHITEBOARD_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: 'DELETE_BOARD_SUCCESS',
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: 'DELETE_BOARD_FAILURE',
    });
  }
};
