import { RootState } from "types/RootState";
import { Editor } from "types/EditorType";

export const getAllEditors = (state: RootState): Editor[] => {
  return state.editors.editorsIds.map((id) => {
    return state.editors.editorsMap[id];
  });
};
