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
  REMOVE_EDITOR,
  RemoveEditor,
  SHOW_NEW_EDITOR_BOXES,
  ShowNewEditorBoxes,
} from "state/editors/types";
import { EDITOR_TYPES } from "config/constants";
import { Editor } from "types/EditorType";

export interface EditorsState {
  editorsIds: string[];
  editorsMap: {
    [key: string]: Editor;
  };
  activeEditorId: string;
  newEditorBoxesVisible: boolean;
}

const initialState: EditorsState = {
  editorsIds: [],
  editorsMap: {},
  activeEditorId: "",
  newEditorBoxesVisible: true,
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
  state.newEditorBoxesVisible = false;
};

const setActiveEditor = (state: EditorsState, action: SetActiveEditorType) => {
  if (state.editorsIds.includes(action.payload)) {
    state.activeEditorId = action.payload;
    state.newEditorBoxesVisible = false;
  }
};

const hadleSaveEditorContent = (
  state: EditorsState,
  action: SaveEditorContentType
) => {
  state.editorsMap[action.payload.editorId].content = action.payload.content;
};

const handleEditorRemoval = (state: EditorsState, action: RemoveEditor) => {
  state.editorsIds = state.editorsIds.filter((id) => id !== action.payload);
  delete state.editorsMap[action.payload];

  if (state.editorsIds.length === 0) {
    state.newEditorBoxesVisible = true;
  }

  if (state.activeEditorId === action.payload) {
    state.activeEditorId = state.editorsIds[0] || "";
  }
};

const handleShowNewEditorBoxes = (
  state: EditorsState,
  action: ShowNewEditorBoxes
) => {
  state.newEditorBoxesVisible = true;
  state.activeEditorId = "";
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
    case REMOVE_EDITOR: {
      return produce(state, (draft) => handleEditorRemoval(draft, action));
    }
    case SHOW_NEW_EDITOR_BOXES: {
      return produce(state, (draft) => handleShowNewEditorBoxes(draft, action));
    }
    default:
      return state;
  }
};
