import { RootState } from "types/RootState";

export const isUserLoggedInSelector = (state: RootState): boolean => {
  return state.app.isUserLoggedIn;
};
