from dataclasses import dataclass
from typing import Generic, TypeVar

from .entity_data_state import EntityDataState
from .entity_id import EntityId
from .entity_state import EntityState

T = TypeVar("T")


@dataclass(slots=True)
class Entity(Generic[T]):
    id: EntityId
    name: str
    state: EntityState
    data_state: EntityDataState
    payload: T | None = None
