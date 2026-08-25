from dataclasses import dataclass
from typing import Callable, Generic, TypeVar

T = TypeVar("T")
U = TypeVar("U")


@dataclass(slots=True)
class Operation(Generic[T, U]):
    name: str
    instruction: Callable[[T], U]


@dataclass(slots=True)
class ExpandOperation(Generic[T, U]):
    name: str
    instruction: Callable[[T], list[U]]
