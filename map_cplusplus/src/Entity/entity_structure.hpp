#pragma once
#include "entity_id.hpp"
#include "../Path/path_id.hpp"
#include <optional>
#include <vector>

namespace mapcore {
struct EntityStructure {
    EntityId entity;
    std::vector<PathId> incomingPaths;
    std::vector<PathId> outgoingPaths;
    std::optional<EntityId> parent;
    std::vector<EntityId> children;
};
}
