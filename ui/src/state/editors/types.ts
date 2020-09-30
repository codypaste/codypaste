import { AddEditorPayload } from "types/AddEditorPayload";

export const ADD_EDITOR = "ui/editors/ADD_EDITOR";

export interface AddEditorActionType {
  type: typeof ADD_EDITOR;
  payload: AddEditorPayload;
}

export type EditorsActionTypes = AddEditorActionType;
