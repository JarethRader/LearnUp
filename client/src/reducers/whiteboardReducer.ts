const initialState: IWhiteboardState = {
  author: undefined,
  audience: undefined,
  boardState: [],
  ownBoards: [],
  sharedBoards: [],
  whiteboardLoading: false,
};

export default function (
  state = initialState,
  action: WhiteboardActionTypes
): IWhiteboardState {
  switch (action.type) {
    case 'UPLOAD_BOARD_SUCCESS':
    case 'UPDATE_BOARD_SUCCESS':
      return {
        ...state,
        author: action.payload.whiteboard.author,
        audience: action.payload.whiteboard.audience,
        boardState: action.payload.whiteboard.boardState,
        whiteboardLoading: false,
      };
    case 'GET_BOARD_SUCCESS':
      return {
        ...state,
        ownBoards: action.payload.ownWhiteboards,
        sharedBoards: action.payload.sharedWhiteboards,
      };
    case 'DELETE_BOARD_SUCCESS':
      return {
        ...state,
        author: undefined,
        audience: undefined,
        boardState: [],
        whiteboardLoading: false,
      };
    case 'GET_BOARD_FAILURE':
    case 'UPLOAD_BOARD_FAILURE':
    case 'UPDATE_BOARD_FAILURE':
    case 'DELETE_BOARD_FAILURE':
      return {
        ...state,
        whiteboardLoading: false,
      };
    case 'BOARD_STATE_LOADING':
      return {
        ...state,
        whiteboardLoading: true,
      };
    default:
      return state;
  }
}
