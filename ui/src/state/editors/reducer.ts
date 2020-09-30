import produce from "immer";
import { nanoid } from "nanoid";
import { ADD_EDITOR, EditorsActionTypes } from "state/editors/types";
import { Editor } from "types/EditorType";

export interface EditorsState {
  editorsIds: string[];
  editorsMap: {
    [key: string]: Editor;
  };
}

const initialState: EditorsState = {
  editorsIds: [],
  editorsMap: {},
};

const handleAddEditor = (state: EditorsState, action: EditorsActionTypes) => {
  const id = nanoid();
  const newEditor: Editor = {
    id,
    content: "",
    title: action.payload.title,
    type: action.payload.type,
  };

  state.editorsIds.push(id);
  state.editorsMap[id] = newEditor;
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
