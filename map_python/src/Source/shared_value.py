from dataclasses import dataclass, field


@dataclass(slots=True)
class SharedValue:
    industry_name: str
    values: list[str] = field(default_factory=list)
