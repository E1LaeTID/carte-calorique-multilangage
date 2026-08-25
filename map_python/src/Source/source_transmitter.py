from dataclasses import dataclass, field

from .skill import Skill
from .source import Source
from .staff import Staff


@dataclass(slots=True)
class Transmitter:
    label: str
    message: str
    object_ref: str
    chief: Staff
    skills: list[Skill] = field(default_factory=list)
    staff_limit: int = 0
    action_limit: int = 0
    value_limit: int = 0


ContainerDestination = str


@dataclass(slots=True)
class SourceTransmitter:
    source: Source
    transmitter: Transmitter
    receiver: ContainerDestination
