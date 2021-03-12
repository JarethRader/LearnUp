const initialState: IWhiteboardState = {
  currentBoard: {
    _id: "",
    name: "",
    author: "",
    audience: "",
  },
  ownBoards: [],
  sharedBoards: [],
  whiteboardLoading: false,
};

export default function (
  state = initialState,
  action: WhiteboardActionTypes
): IWhiteboardState {
  switch (action.type) {
    case "UPLOAD_BOARD_SUCCESS":
    case "UPDATE_BOARD_SUCCESS":
      return {
        ...state,
        currentBoard: action.payload.whiteboard,
        whiteboardLoading: false,
      };
    case "GET_BOARD_SUCCESS":
      return {
        ...state,
        ownBoards: action.payload.ownWhiteboards,
        sharedBoards: action.payload.sharedWhiteboards,
        whiteboardLoading: false,
      };
    case "SET_CURRENT_BOARD":
      return {
        ...state,
        currentBoard: {
          // @ts-ignore
          _id: action.payload._id,
          name: action.payload.name,
          author: action.payload.author,
          audience: action.payload.audience || "none",
        },
        whiteboardLoading: false,
      };
    case "CLEAR_CURRENT_BOARD":
      return {
        ...state,
        whiteboardLoading: false,
      };
    case "DELETE_BOARD_SUCCESS":
      return {
        ...state,
        currentBoard: {
          _id: "",
          name: "",
          author: "",
          audience: "",
        },
        whiteboardLoading: false,
      };
    case "GET_BOARD_FAILURE":
    case "UPLOAD_BOARD_FAILURE":
    case "UPDATE_BOARD_FAILURE":
    case "DELETE_BOARD_FAILURE":
      return {
        ...state,
        whiteboardLoading: false,
      };
    case "BOARD_STATE_LOADING":
      return {
        ...state,
        whiteboardLoading: true,
      };
    default:
      return state;
  }
}
