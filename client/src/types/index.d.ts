export {};

import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../reducers/index';

declare global {
  interface CSRFConfig {
    Accept: string;
    'Content-Type': string;
    'CSRF-Token': string | null;
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
}
