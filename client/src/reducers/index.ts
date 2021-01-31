import { combineReducers } from 'redux';
import userReducer from './userReducer';

// Add all reducers to this function below
const rootReducer: any = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
