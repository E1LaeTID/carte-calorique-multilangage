from dataclasses import dataclass, field
from enum import StrEnum

from .staff import Staff
from .strategy import Strategy


@dataclass(slots=True)
class SourceStrategy:
    name: str
    strategy: Strategy


@dataclass(slots=True)
class SourceCourse:
    content: str
    gain: list[str]
    price: float


@dataclass(slots=True)
class SourceChart:
    communication_policy: str
    ethical_line: list[str]


class SourceState(StrEnum):
    INCOMPLETE = "incomplete"
    COMPLETE = "complete"
    ACTIVE = "active"
    PASSIVE = "passive"
    DEPLETED = "depleted"
    SATURATED = "saturated"


@dataclass(slots=True)
class Source:
    strategy: SourceStrategy
    team: list[Staff] = field(default_factory=list)
    courses: list[SourceCourse] = field(default_factory=list)
    chart: SourceChart | None = None
    state: SourceState = SourceState.INCOMPLETE
