from dataclasses import dataclass, field


@dataclass(slots=True)
class Strategy:
    object_ref: str
    actions: list[str] = field(default_factory=list)
    conditions: list[bool] = field(default_factory=list)
