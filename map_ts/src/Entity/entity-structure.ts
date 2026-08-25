import type { EntityId } from "./entity-id.js";
import type { PathId } from "../Path/path-id.js";

export type EntityStructure = {
  entity: EntityId;

  incomingPaths: PathId[];
  outgoingPaths: PathId[];

  parent?: EntityId;
  children: EntityId[];
};