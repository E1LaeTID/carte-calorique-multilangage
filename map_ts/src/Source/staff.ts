// staff.ts

import type { Skill } from "./skill.js";
import type { SharedValue } from "./shared-value.js";

export type Staff = {
  name: string;
  position: string;
  skills: Skill[];
  sharedValues: SharedValue[];
};