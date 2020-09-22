import { SignInPayload } from "types/SignInPayload";

export const SIGN_IN_USER = "ui/app/SIGN_IN_USER";
export const SIGN_OUT_USER = "ui/app/SIGN_OUT_USER";

export interface SignInUser {
  type: typeof SIGN_IN_USER;
  payload: SignInPayload;
}

export type AppActionTypes = SignInUser;