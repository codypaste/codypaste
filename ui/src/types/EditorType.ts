import { EditorTypesType } from "config/constants";

export interface Editor {
  id: string;
  type: EditorTypesType;
  title: string;
  content: string;
}
