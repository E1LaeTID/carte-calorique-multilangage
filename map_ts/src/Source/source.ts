// source.ts

import type { Strategy } from "./strategy.js";
import type { Staff } from "./staff.js";
import type { Skill } from "./skill.js";

export type SourceStrategy = {
  name: string;
  strategy: Strategy;
};

export type SourceCourse = {
  content: string;
  gain: Skill[];
  price: number;
};

export type SourceChart = {
  communicationPolicy: string;
  ethicalLine: string[];
};

export type SourceState =
  | "incomplete"
  | "complete"
  | "active"
  | "passive"
  | "depleted"
  | "saturated";

export type Source = {
  strategy: SourceStrategy;
  team: Staff[];
  courses: SourceCourse[];
  chart: SourceChart;
  state: SourceState;
};