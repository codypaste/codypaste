export const MODAL_TYPES = {
  LOGIN_MODAL: "LOGIN_MODAL",
  REGISTER_MODAL: "REGISTER_MODAL",
};

type Keys = keyof typeof MODAL_TYPES;
export type ModalValues = typeof MODAL_TYPES[Keys];
