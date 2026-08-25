import type { PathId } from "./path-id.js";

export type PathCost = {
  path: PathId;

  value: number;
  unit: string;

  balanceChecker: (
    available: number,
    required: number
  ) => boolean;
};