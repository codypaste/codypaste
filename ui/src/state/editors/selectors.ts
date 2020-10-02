import { RootState } from "types/RootState";
import { Editor } from "types/EditorType";

export const getAllEditors = (state: RootState): Editor[] => {
  return state.editors.editorsIds.map((id) => {
    return state.editors.editorsMap[id];
  });
};

export const hasAnyEditor = (state: RootState): boolean => {
  return state.editors.editorsIds.length > 0;
};

export const getActiveEditor = (state: RootState): Editor => {
  const activeEditorId = state.editors.activeEditorId;
  const editor = state.editors.editorsMap[activeEditorId];
  return editor;
};

export const getActiveEditorId = (state: RootState): string => {
  const activeEditorId = state.editors.activeEditorId;
  return activeEditorId;
};
