import produce from "immer";
import { nanoid } from "nanoid";
import {
  ADD_EDITOR,
  SET_ACTIVE_EDITOR,
  EditorsActionTypes,
  AddEditorActionType,
  SetActiveEditorType,
  SaveEditorContentType,
  SAVE_EDITOR_CONTENT,
} from "state/editors/types";
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

const handleAddEditor = (state: EditorsState, action: AddEditorActionType) => {
  const id = nanoid();
  const newEditor: Editor = {
    id,
    content: "",
    title: action.payload.title || "Untitled editor",
    type: action.payload.type || EDITOR_TYPES.CODE,
  };

  state.editorsIds.push(id);
  state.editorsMap[id] = newEditor;
  state.activeEditorId = id;
};

const setActiveEditor = (state: EditorsState, action: SetActiveEditorType) => {
  state.activeEditorId = action.payload;
};

const hadleSaveEditorContent = (
  state: EditorsState,
  action: SaveEditorContentType
) => {
  state.editorsMap[action.payload.editorId].content = action.payload.content;
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
    case SET_ACTIVE_EDITOR: {
      return produce(state, (draft) => setActiveEditor(draft, action));
    }
    case SAVE_EDITOR_CONTENT: {
      return produce(state, (draft) => hadleSaveEditorContent(draft, action));
    }
    default:
      return state;
  }
};
