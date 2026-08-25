import type { PathState } from "./path-state.js";
import type { PathDataState } from "./path-data-state.js";

export type PathTransformation = {
  initialState: PathState;
  finalState: PathState;

  initialDataState: PathDataState;
  finalDataState: PathDataState;
};