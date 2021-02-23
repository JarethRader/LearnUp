/**
 * @description These are global type definitions for typescript. I Like defining stuff here that might break the file heirarchy. I find it easy than importing them all over the applicaiton.
 */

export {};

import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { RootState } from "../reducers/index";

declare global {
  interface CSRFConfig {
    Accept: string;
    "Content-Type": string;
    "CSRF-Token": string | null;
  }

  type UserThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<UserActionTypes>
  >;

  type WhiteboardThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<WhiteboardActionTypes>
  >;

  type AudioThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<AudioActionTypes>
  >;
}
