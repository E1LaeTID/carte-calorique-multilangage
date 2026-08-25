from dataclasses import dataclass


@dataclass(slots=True)
class Skill:
    name: str
    level: float
