#pragma once
#include "entity.hpp"
#include <functional>
#include <string>
#include <vector>

namespace mapcore {
enum class EntityOperationKind { Connect, Disconnect, Add, Subtract, Apply, Evolve };

template <typename TInputPayload, typename TOutputPayload = TInputPayload>
struct EntityOperation {
    std::string name;
    EntityOperationKind kind{EntityOperationKind::Apply};
    std::function<Entity<TOutputPayload>(const Entity<TInputPayload>&)> apply;
};

template <typename TInputPayload, typename TOutputPayload = TInputPayload>
struct EntityExpansion {
    std::string name;
    EntityOperationKind kind{EntityOperationKind::Evolve};
    std::function<std::vector<Entity<TOutputPayload>>(const Entity<TInputPayload>&)> apply;
};
}
