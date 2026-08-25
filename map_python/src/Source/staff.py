from dataclasses import dataclass, field

from .shared_value import SharedValue
from .skill import Skill


@dataclass(slots=True)
class Staff:
    name: str
    position: str
    skills: list[Skill] = field(default_factory=list)
    shared_values: list[SharedValue] = field(default_factory=list)
