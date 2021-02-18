import { createStore, combineReducers } from "redux";
import { appReducer } from "state/app/reducer";
import { editorsReducer } from "state/editors/reducer";

const rootReducer = combineReducers({
  app: appReducer,
  editors: editorsReducer,
});

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
