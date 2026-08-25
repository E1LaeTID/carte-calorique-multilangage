#pragma once
#include "path_id.hpp"
#include "path_state.hpp"
#include "path_data_state.hpp"
#include <optional>

namespace mapcore {
struct PathStateTransition { PathState from; PathState to; };
struct PathDataTransition { PathDataState from; PathDataState to; };
struct PathSchedule {
    PathStateTransition stateTransition;
    PathDataTransition dataTransition;
    PathId currentPath;
    std::optional<PathId> nextPath;
    std::optional<PathId> destination;
};
}
