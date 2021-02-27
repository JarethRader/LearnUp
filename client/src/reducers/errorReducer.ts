const initialState: IErrorState = {
  errors: {
    msg: "",
    type: null,
    status: 0,
    id: null,
  },
};

export default function (
  state = initialState,
  action: ErrorActionTypes
): IErrorState {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        errors: {
          msg: action.payload.msg,
          type: action.payload.type,
          status: action.payload.status,
          id: action.payload.id,
        },
      };
    case "CLEAR_ERRORS":
      return {
        errors: {
          msg: "",
          type: null,
          status: 0,
          id: null,
        },
      };
    default:
      return state;
  }
}
