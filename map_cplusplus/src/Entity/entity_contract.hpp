#pragma once
#include <optional>
#include <string>
#include <vector>

namespace mapcore {
struct ContractCondition { std::string name; bool satisfied{false}; };
struct OperationCost { double amount{0.0}; std::string unit; };
struct EntityContract {
    std::string name;
    std::vector<ContractCondition> conditions;
    std::optional<OperationCost> applyCost;
    std::optional<OperationCost> evolveCost;
};
}
