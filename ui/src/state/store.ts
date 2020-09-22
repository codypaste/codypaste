import { createStore, combineReducers } from "redux";
import { appReducer } from "state/app/reducer";

const rootReducer = combineReducers({
  app: appReducer,
});

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
