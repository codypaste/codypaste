export const MODAL_TYPES = {
  LOGIN_MODAL: "LOGIN_MODAL",
  REGISTER_MODAL: "REGISTER_MODAL",
};

type ModalKeys = keyof typeof MODAL_TYPES;
export type ModalValues = typeof MODAL_TYPES[ModalKeys];

export const EDITOR_TYPES = {
  PLAIN_TEXT: "PLAIN_TEXT",
  RICH_TEXT: "RICH_TEXT",
  CODE: "CODE",
};

type EditorTypesKeys = keyof typeof EDITOR_TYPES;
export type EditorTypesType = typeof EDITOR_TYPES[EditorTypesKeys];
