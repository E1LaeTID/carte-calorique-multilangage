from dataclasses import dataclass
from typing import Callable

from .path_id import PathId


@dataclass(slots=True)
class PathCost:
    path: PathId
    value: float
    unit: str
    balance_checker: Callable[[float, float], bool]
