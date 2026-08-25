from dataclasses import dataclass
from enum import StrEnum
from typing import Callable, Generic, TypeVar

from .entity import Entity

T = TypeVar("T")
U = TypeVar("U")


class EntityOperationKind(StrEnum):
    CONNECT = "connect"
    DISCONNECT = "disconnect"
    ADD = "add"
    SUBTRACT = "subtract"
    APPLY = "apply"
    EVOLVE = "evolve"


@dataclass(slots=True)
class EntityOperation(Generic[T, U]):
    name: str
    kind: EntityOperationKind
    apply: Callable[[Entity[T]], Entity[U]]


@dataclass(slots=True)
class EntityExpansion(Generic[T, U]):
    name: str
    kind: EntityOperationKind
    apply: Callable[[Entity[T]], list[Entity[U]]]
