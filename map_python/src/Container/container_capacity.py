from dataclasses import dataclass

from .memory import Memory
from .limit import Limit


@dataclass(slots=True)
class ContainerCapacity:
    memory_state: Memory
    limit: Limit
