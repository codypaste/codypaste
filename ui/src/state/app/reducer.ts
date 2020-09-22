import produce from "immer";
import { AppActionTypes, SIGN_IN_USER } from "state/app/types";

export interface AppState {
  isUserLoggedIn: boolean;
}

const initialState: AppState = {
  isUserLoggedIn: false,
};

const handleSignInUser = (state: AppState, action: AppActionTypes) => {
  state.isUserLoggedIn = true;
};

export const appReducer = (
  state = initialState,
  action: AppActionTypes
): AppState => {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case SIGN_IN_USER: {
      return produce(state, (draft) => handleSignInUser(draft, action));
    }
    default:
      return state;
  }
};
