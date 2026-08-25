#pragma once
#include "path_id.hpp"
#include <optional>
#include <string>
#include <vector>

namespace mapcore {
enum class GateState { Open, Closed, Conditional };
struct GateCondition { std::string name; bool satisfied{false}; };
struct PathGate {
    GateState state{GateState::Closed};
    PathId incomingPath;
    PathId outgoingPath;
    std::optional<std::string> message;
    std::vector<GateCondition> conditions;
};
}
