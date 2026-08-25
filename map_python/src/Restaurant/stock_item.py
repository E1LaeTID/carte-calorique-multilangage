from dataclasses import dataclass
from enum import StrEnum

from .ingredient import Ingredient


class StockState(StrEnum):
    AVAILABLE = "available"
    LOW = "low"
    EMPTY = "empty"


@dataclass(slots=True)
class StockItem:
    ingredient: Ingredient
    available_quantity: float
    state: StockState
