import { ADD_EDITOR, EditorsActionTypes } from "state/editors/types";
import { AddEditorPayload } from "types/AddEditorPayload";

export const addEditor = (payload: AddEditorPayload): EditorsActionTypes => {
  return {
    type: ADD_EDITOR,
    payload: payload,
  };
};
