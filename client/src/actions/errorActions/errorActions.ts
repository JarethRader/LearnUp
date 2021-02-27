export const returnErrors = (
  type = null,
  msg: string,
  status: number,
  id = null
): ErrorActionTypes => {
  return {
    type: "GET_ERRORS",
    payload: {
      type,
      msg,
      status,
      id,
    },
  };
};

export const clearError = () => {
  return {
    type: "CLEAR_ERRORS",
  };
};
