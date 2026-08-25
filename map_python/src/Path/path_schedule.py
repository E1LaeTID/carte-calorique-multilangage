from dataclasses import dataclass

from .path_data_state import PathDataState
from .path_id import PathId
from .path_state import PathState


@dataclass(slots=True)
class PathStateTransition:
    source: PathState
    target: PathState


@dataclass(slots=True)
class PathDataTransition:
    source: PathDataState
    target: PathDataState


@dataclass(slots=True)
class PathSchedule:
    state_transition: PathStateTransition
    data_transition: PathDataTransition
    current_path: PathId
    next_path: PathId | None = None
    destination: PathId | None = None
