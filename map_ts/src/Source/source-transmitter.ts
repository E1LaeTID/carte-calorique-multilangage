// source-transmitter.ts

import type { Source } from "./source.js";
import type { Staff } from "./staff.js";
import type { Skill } from "./skill.js";

export type Transmitter = {
  label: string;
  message: string;

  objectRef: string;

  chief: Staff;

  skills: Skill[];

  staffLimit: number;
  actionLimit: number;
  valueLimit: number;
};

export type ContainerDestination = string;

export type SourceTransmitter = {
  source: Source;
  transmitter: Transmitter;
  receiver: ContainerDestination;
};