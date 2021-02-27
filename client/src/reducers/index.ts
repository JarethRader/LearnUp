import { combineReducers } from "redux";
import userReducer from "./userReducer";
import whiteboardReducer from "./whiteboardReducer";
import audioReducer from "./audioReducer";
import errorReducer from "./errorReducer";

// Add all reducers to this function below
const rootReducer: any = combineReducers({
  user: userReducer,
  whiteboard: whiteboardReducer,
  audio: audioReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
