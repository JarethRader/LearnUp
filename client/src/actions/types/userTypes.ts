import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  USER_LOADED,
  AUTH_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  GET_SELF_SUCCESS,
  GET_SELF_FAILED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "./types";

declare global {
  interface IUserModel {
    id: string;
    username?: string;
    email?: string;
  }

  interface IUserState {
    userInfo?: IUserModel;
    isAuthenticated?: boolean;
    isVerified?: boolean;
    userLoading?: boolean;
  }

  interface UserInfoObj {
    username: string;
    email: string;
    password: string;
  }

  interface UserLoginInfoObj {
    email: string;
    password: string;
  }

  interface UpdateUserInfoObj {
    username?: string;
    email?: string;
    password?: string;
    verified?: boolean;
  }

  interface UserResponse {
    user: {
      _id: string;
      username: string;
      email: string;
      verified: boolean;
    };
  }

  interface LoadingUserAction {
    type: typeof USER_LOADING;
    payload?: null;
  }

  // Login action interface
  interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: UserResponse;
  }
  interface LoginFail {
    type: typeof LOGIN_FAILED;
    payload?: null;
  }

  // Login action type
  type LoginActionTypes = LoginSuccess | LoginFail;

  // Login action interface
  interface LogoutSuccess {
    type: typeof LOGOUT_SUCCESS;
    payload?: null;
  }
  interface LogoutFail {
    type: typeof LOGOUT_FAILED;
    payload?: null;
  }

  // Logout action type
  type LogoutActionTypes = LogoutSuccess | LogoutFail;

  // Register success interface
  interface RegisterSuccess {
    type: typeof REGISTER_SUCCESS;
    payload: UserResponse;
  }
  // Register failed interface
  interface RegisterFail {
    type: typeof REGISTER_FAILED;
    payload?: null;
  }
  // Register action type
  type RegisterActionTypes = RegisterSuccess | RegisterFail;

  // cookie authentication type
  interface AuthFailed {
    type: typeof AUTH_ERROR;
    payload?: any;
  }

  interface AuthSuccess {
    type: typeof USER_LOADED;
    payload?: IUserModel;
  }

  type AuthActionTypes = AuthFailed | AuthSuccess;

  // update user profile data types
  interface UpdateSuccess {
    type: typeof UPDATE_USER_SUCCESS;
    payload: UserResponse;
  }

  interface UpdateFailed {
    type: typeof UPDATE_USER_FAILED;
    payload?: null;
  }

  type UpdateActionType = UpdateSuccess | UpdateFailed;

  // get use data types
  interface GetUserSuccess {
    type: typeof GET_SELF_SUCCESS;
    payload: UserResponse;
  }

  interface GetUserFailed {
    type: typeof GET_SELF_FAILED;
    payload?: null;
  }

  type GetUserActionTypes = GetUserSuccess | GetUserFailed;

  // delete user types
  interface DeleteUserSuccess {
    type: typeof DELETE_USER_SUCCESS;
    payload: null;
  }

  interface DeleteUserFailed {
    type: typeof DELETE_USER_FAILED;
    payload: null;
  }

  type DeleteUserActionTypes = DeleteUserSuccess | DeleteUserFailed;

  type UserActionTypes =
    | LoginActionTypes
    | LoadingUserAction
    | RegisterActionTypes
    | AuthActionTypes
    | UpdateActionType
    | GetUserActionTypes
    | DeleteUserActionTypes
    | LogoutActionTypes;
}
