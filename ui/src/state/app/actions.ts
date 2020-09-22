import { AppActionTypes, SIGN_IN_USER } from "state/app/types";
import { SignInPayload } from "types/SignInPayload";

export const signInUser = (payload: SignInPayload): AppActionTypes => {
  return {
    type: SIGN_IN_USER,
    payload: payload,
  };
};
