import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../../reducers/index";

import { USER_BASE, API_SUFFIX, CSRFConfig } from "../utils/config";

// import helper functions
import {
  RegisterHelper,
  LoginHelper,
  UpdateHelper,
  LogoutHelper,
  getUserHelper,
  findUserHelper,
  deleteHelper,
} from "./functions";

const USER_API = USER_BASE + API_SUFFIX;

/**
 * @desc Register a new user
 * @param body
 */
export const register = (body: UserInfoObj): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "USER_LOADING " });
  try {
    await RegisterHelper(body, USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: response,
        });
      })
      .catch((err: Error) => {
        throw err;
      });
  } catch (err) {
    // add error handling state
    dispatch({
      type: "REGISTER_FAILED",
    });
  }
};

/**
 * @desc Login an existing user
 * @param body
 */
export const login = (body: UserLoginInfoObj): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "USER_LOADING" });
  try {
    await LoginHelper(body, USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response,
        });
      })
      .catch((err) => {
        // console.log("Error:", err);
        throw err;
      });
  } catch (err) {
    // console.log("Error:", err);
    dispatch({
      type: "LOGIN_FAILED",
    });
  }
};

export const logout = (): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "USER_LOADING" });
  try {
    await LogoutHelper(USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "LOGOUT_SUCCESS",
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "LOGOUT_FAILED",
    });
  }
};

export const update = (
  body: UpdateUserInfoObj,
  userID: string
): UserThunk => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  dispatch({ type: "USER_LOADING" });
  try {
    await UpdateHelper(body, userID, USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "UPDATE_USER_SUCCESS",
          payload: response,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "UPDATE_USER_FAILED",
    });
  }
};

export const getUser = (userID: string): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "USER_LOADING" });
  try {
    await getUserHelper(userID, USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "GET_SELF_SUCCESS",
          payload: response,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "GET_SELF_FAILED",
    });
  }
};

export const deleteUser = (userID: string): UserThunk => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  dispatch({ type: "USER_LOADING" });
  try {
    await deleteHelper(userID, USER_API, CSRFConfig)
      .then((response) => {
        dispatch({
          type: "DELETE_USER_SUCCESS",
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    dispatch({
      type: "DELETE_USER_FAILED",
    });
  }
};

export const findUserByEmail = async (email: string) => {
  return await findUserHelper(email, USER_API, CSRFConfig)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return null;
    });
};

/**
 * @desc set loading to true while actions are running
 */
export function setUserLoading(): UserActionTypes {
  return {
    type: "USER_LOADING",
  };
}
