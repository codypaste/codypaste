import { AppState } from "state/app/reducer";
import { EditorsState } from "state/editors/reducer";

export interface RootState {
  app: AppState;
  editors: EditorsState;
}
