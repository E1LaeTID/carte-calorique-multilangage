from dataclasses import dataclass


@dataclass(slots=True)
class Memory:
    id: str
    readable: bool
    writable: bool
