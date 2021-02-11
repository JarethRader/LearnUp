const initialState: IWhiteboardState = {
  boardState: [],
  currentBoard: {
    id: '',
    name: '',
    author: '',
    audience: '',
    boardState: [],
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
    case 'UPLOAD_BOARD_SUCCESS':
    case 'UPDATE_BOARD_SUCCESS':
      return {
        ...state,
        currentBoard: action.payload.whiteboard,
        whiteboardLoading: false,
      };
    case 'GET_BOARD_SUCCESS':
      return {
        ...state,
        ownBoards: action.payload.ownWhiteboards,
        sharedBoards: action.payload.sharedWhiteboards,
      };
    case 'SET_CURRENT_BOARD':
      console.log(action.payload);
      return {
        ...state,
        currentBoard: {
          id: action.payload.id,
          name: action.payload.name,
          author: action.payload.author,
          audience: action.payload.audience || 'none',
          boardState: action.payload.boardState,
        },
      };
    case 'CLEAR_CURRENT_BOARD':
      return {
        ...state,
        boardState: [],
      };
    case 'DELETE_BOARD_SUCCESS':
      return {
        ...state,
        currentBoard: {
          id: '',
          name: '',
          author: '',
          audience: '',
          boardState: [],
        },
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
