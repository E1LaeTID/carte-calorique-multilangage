from dataclasses import dataclass
from typing import Generic, TypeVar

from ..Entity.entity_id import EntityId
from .path_data_state import PathDataState
from .path_id import PathId
from .path_state import PathState

T = TypeVar("T")


@dataclass(slots=True)
class Path(Generic[T]):
    id: PathId
    source: EntityId
    target: EntityId
    state: PathState
    data_state: PathDataState
    payload: T | None = None
