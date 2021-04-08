const initialState: IWhiteboardState = {
  currentBoard: {
    whiteboard_id: "",
    boardName: "",
    author: "",
    audience: "",
    tiles: [],
    layout: {
      layout_id: "",
      boundingRect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      tiles: [],
    },
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
        // currentBoard: action.payload.whiteboard,
        whiteboardLoading: false,
      };
    case "GET_BOARD_SUCCESS":
      return {
        ...state,
        currentBoard: {
          whiteboard_id: action.payload.whiteboard.w_id,
          boardName: action.payload.whiteboard.bn,
          author: action.payload.whiteboard.ar,
          audience: action.payload.whiteboard.au,
          tiles: action.payload.whiteboard.Whiteboard_Tiles.map((tile) => ({
            uid: tile.c_id,
            tile_id: tile.t_id,
            tile: {
              letters: tile.Tile.l,
              color: tile.Tile.c,
            },
            delta: {
              x: tile.dx,
              y: tile.dy,
            },
          })),
          layout: {
            layout_id: action.payload.whiteboard.Layout.l_id,
            boundingRect: {
              x: action.payload.whiteboard.Layout.bx,
              y: action.payload.whiteboard.Layout.by,
              width: action.payload.whiteboard.Layout.bw,
              height: action.payload.whiteboard.Layout.bh,
            },
            tiles: action.payload.whiteboard.Layout.Layout_Tiles.map(
              (tile) => ({
                uid: tile.c_id,
                tile_id: tile.t_id,
                tile: {
                  letters: tile.Tile.l,
                  color: tile.Tile.c,
                },
                delta: {
                  x: tile.dx,
                  y: tile.dy,
                },
              })
            ),
          },
        },
      };
    case "GET_USER_BOARD_SUCCESS":
      return {
        ...state,
        ownBoards: action.payload.ownWhiteboards.map((whiteboard) => ({
          whiteboard_id: whiteboard.w_id,
          boardName: whiteboard.bn,
          author: whiteboard.ar,
          audience: whiteboard.au,
        })),
        sharedBoards: action.payload.sharedWhiteboards.map((whiteboard) => ({
          whiteboard_id: whiteboard.w_id,
          boardName: whiteboard.bn,
          author: whiteboard.ar,
          audience: whiteboard.au,
        })),
        whiteboardLoading: false,
      };
    case "DELETE_BOARD_SUCCESS":
      return {
        ...state,
        currentBoard: {
          whiteboard_id: "",
          boardName: "",
          author: "",
          audience: "",
          tiles: [],
          layout: {
            layout_id: "",
            boundingRect: {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
            tiles: [],
          },
        },
        whiteboardLoading: false,
      };
    case "GET_BOARD_FAILURE":
    case "GET_USER_BOARD_FAILURE":
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
