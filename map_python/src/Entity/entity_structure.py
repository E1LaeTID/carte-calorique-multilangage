from dataclasses import dataclass, field

from .entity_id import EntityId
from ..Path.path_id import PathId


@dataclass(slots=True)
class EntityStructure:
    entity: EntityId
    incoming_paths: list[PathId] = field(default_factory=list)
    outgoing_paths: list[PathId] = field(default_factory=list)
    parent: EntityId | None = None
    children: list[EntityId] = field(default_factory=list)
