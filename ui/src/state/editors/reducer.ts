import produce from "immer";
import { nanoid } from "nanoid";
import { ADD_EDITOR, EditorsActionTypes } from "state/editors/types";
import { EDITOR_TYPES } from "config/constants";
import { Editor } from "types/EditorType";

export interface EditorsState {
  editorsIds: string[];
  editorsMap: {
    [key: string]: Editor;
  };
  activeEditorId: string;
}

const initialState: EditorsState = {
  editorsIds: [],
  editorsMap: {},
  activeEditorId: "",
};

const handleAddEditor = (state: EditorsState, action: EditorsActionTypes) => {
  const id = nanoid();
  const newEditor: Editor = {
    id,
    content: "",
    title: action.payload.title || "Untitled editor",
    type: action.payload.type || EDITOR_TYPES.CODE,
  };

  state.editorsIds.push(id);
  state.editorsMap[id] = newEditor;
  if (state.editorsIds.length === 1) {
    state.activeEditorId = id;
  }
};

export const editorsReducer = (
  state = initialState,
  action: EditorsActionTypes
): EditorsState => {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case ADD_EDITOR: {
      return produce(state, (draft) => handleAddEditor(draft, action));
    }
    default:
      return state;
  }
};
