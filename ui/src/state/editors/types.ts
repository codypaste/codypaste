import { AddEditorPayload } from "types/AddEditorPayload";
import { SaveEditorContentPayloadType } from "types/SaveEditorContentPayloadType";

export const ADD_EDITOR = "ui/editors/ADD_EDITOR";
export const SET_ACTIVE_EDITOR = "ui/editors/SET_ACTIVE_EDITOR";
export const SAVE_EDITOR_CONTENT = "ui/editors/SAVE_EDITOR_CONTENT";
export const REMOVE_EDITOR = "ui/editors/REMOVE_EDITOR";

export interface AddEditorActionType {
  type: typeof ADD_EDITOR;
  payload: AddEditorPayload;
}

export interface SetActiveEditorType {
  type: typeof SET_ACTIVE_EDITOR;
  payload: string;
}

export interface SaveEditorContentType {
  type: typeof SAVE_EDITOR_CONTENT;
  payload: SaveEditorContentPayloadType;
}

export interface RemoveEditor {
  type: typeof REMOVE_EDITOR;
  payload: string;
}

export type EditorsActionTypes = AddEditorActionType | SetActiveEditorType | SaveEditorContentType | RemoveEditor;
