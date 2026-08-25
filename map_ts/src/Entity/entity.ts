import type { EntityId } from "./entity-id.js";
import type { EntityState } from "./entity-state.js";
import type { EntityDataState } from "./entity-data-state.js";

export type Entity<
  TPayload = unknown
> = {
  id: EntityId;
  name: string;

  state: EntityState;
  dataState: EntityDataState;

  payload?: TPayload;
};