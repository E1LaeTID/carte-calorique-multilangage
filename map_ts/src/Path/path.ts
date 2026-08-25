import type { PathId } from "./path-id.js";
import type { EntityId } from "../Entity/entity-id.js";
import type { PathState } from "./path-state.js";
import type { PathDataState } from "./path-data-state.js";

export type Path<
  TPayload = unknown
> = {
  id: PathId;

  source: EntityId;
  target: EntityId;

  state: PathState;
  dataState: PathDataState;

  payload?: TPayload;
};