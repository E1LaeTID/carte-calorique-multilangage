// memory.ts

export type MemoryState = [
  readable: boolean,
  writable: boolean
];

export type Memory = {
  id: string;
  state: MemoryState;
};