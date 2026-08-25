#pragma once
#include "entity_id.hpp"
#include "entity_state.hpp"
#include "entity_data_state.hpp"
#include <optional>
#include <string>

namespace mapcore {
template <typename TPayload>
struct Entity {
    EntityId id;
    std::string name;
    EntityState state{EntityState::Floating};
    EntityDataState dataState{EntityDataState::Record};
    std::optional<TPayload> payload;
};
}
