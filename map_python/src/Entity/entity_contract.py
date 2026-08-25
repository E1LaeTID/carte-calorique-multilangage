from dataclasses import dataclass, field


@dataclass(slots=True)
class ContractCondition:
    name: str
    satisfied: bool


@dataclass(slots=True)
class OperationCost:
    amount: float
    unit: str


@dataclass(slots=True)
class EntityContract:
    name: str
    conditions: list[ContractCondition] = field(default_factory=list)
    apply_cost: OperationCost | None = None
    evolve_cost: OperationCost | None = None
