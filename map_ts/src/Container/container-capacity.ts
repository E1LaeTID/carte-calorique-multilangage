// container-capacity.ts

import type { Memory } from "./memory.js";
import type { Limit } from "./limit.js";

export type ContainerCapacity = {
  memoryState: Memory;
  limit: Limit;
};