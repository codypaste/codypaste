import { EditorTypesType } from "config/constants";

export interface AddEditorPayload {
  type: EditorTypesType;
  title: string;
}
