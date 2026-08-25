import type { PathId } from "./path-id.js";

export type GateState =
  | "open"
  | "closed"
  | "conditional";


export type GateCondition = {
  name: string;
  satisfied: boolean;
};


export type PathGate = {
  state: GateState;

  incomingPath: PathId;
  outgoingPath: PathId;

  message?: string;

  conditions: GateCondition[];
};