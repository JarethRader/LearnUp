import { GET_ERRORS, CLEAR_ERRORS } from "./types";

declare global {
  interface IError {
    type: string | null;
    msg: string;
    status: number;
    id: number | null;
  }

  interface IErrorState {
    errors: IError;
  }

  interface GetErrorTypes {
    type: typeof GET_ERRORS;
    payload: IError;
  }

  interface ClearErrors {
    type: typeof CLEAR_ERRORS;
    payload: null;
  }

  type ErrorActionTypes = GetErrorTypes | ClearErrors;
}
