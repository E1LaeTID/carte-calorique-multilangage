from dataclasses import dataclass
from enum import StrEnum


class StockLossKind(StrEnum):
    PREPARATION = "preparation"
    TABLE_RESET = "table-reset"


@dataclass(slots=True)
class StockLoss:
    source_id: str
    kind: StockLossKind
    quantity: float
    unit: str
    reason: str | None = None
