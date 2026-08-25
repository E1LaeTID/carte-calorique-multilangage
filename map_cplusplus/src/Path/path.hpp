#pragma once
#include "path_id.hpp"
#include "path_state.hpp"
#include "path_data_state.hpp"
#include "../Entity/entity_id.hpp"
#include <optional>

namespace mapcore {
template <typename TPayload>
struct Path {
    PathId id;
    EntityId source;
    EntityId target;
    PathState state{PathState::Settled};
    PathDataState dataState{PathDataState::Interfaced};
    std::optional<TPayload> payload;
};
}
