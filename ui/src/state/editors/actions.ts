import {
  ADD_EDITOR,
  EditorsActionTypes,
  SET_ACTIVE_EDITOR,
  SAVE_EDITOR_CONTENT,
  REMOVE_EDITOR,
} from "state/editors/types";
import { AddEditorPayload } from "types/AddEditorPayload";
import { SaveEditorContentPayloadType } from "types/SaveEditorContentPayloadType";

export const addEditor = (payload: AddEditorPayload): EditorsActionTypes => {
  return {
    type: ADD_EDITOR,
    payload: payload,
  };
};

export const setActiveEditor = (editorId: string): EditorsActionTypes => {
  return {
    type: SET_ACTIVE_EDITOR,
    payload: editorId,
  };
};

export const saveEditorContent = (
  payload: SaveEditorContentPayloadType
): EditorsActionTypes => {
  return {
    type: SAVE_EDITOR_CONTENT,
    payload,
  };
};

export const removeEditor = (editorId: string): EditorsActionTypes => {
  return {
    type: REMOVE_EDITOR,
    payload: editorId,
  };
};