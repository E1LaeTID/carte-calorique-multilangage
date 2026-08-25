from dataclasses import dataclass, field
from enum import StrEnum

from .path_id import PathId


class GateState(StrEnum):
    OPEN = "open"
    CLOSED = "closed"
    CONDITIONAL = "conditional"


@dataclass(slots=True)
class GateCondition:
    name: str
    satisfied: bool


@dataclass(slots=True)
class PathGate:
    state: GateState
    incoming_path: PathId
    outgoing_path: PathId
    message: str | None = None
    conditions: list[GateCondition] = field(default_factory=list)
