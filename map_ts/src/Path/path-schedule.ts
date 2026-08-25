import type { PathId } from "./path-id.js";
import type { PathState } from "./path-state.js";
import type { PathDataState } from "./path-data-state.js";

export type PathStateTransition = {
  from: PathState;
  to: PathState;
};


export type PathDataTransition = {
  from: PathDataState;
  to: PathDataState;
};


export type PathSchedule = {
  stateTransition: PathStateTransition;

  dataTransition: PathDataTransition;

  currentPath: PathId;

  nextPath?: PathId;
  destination?: PathId;
};