from dataclasses import dataclass

from .path_data_state import PathDataState
from .path_state import PathState


@dataclass(slots=True)
class PathTransformation:
    initial_state: PathState
    final_state: PathState
    initial_data_state: PathDataState
    final_data_state: PathDataState
