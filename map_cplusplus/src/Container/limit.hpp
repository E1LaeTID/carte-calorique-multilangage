#pragma once
#include <array>
#include <string>
#include <utility>
#include <variant>

namespace mapcore {
using Subdivision = std::pair<std::string, double>;
using SizeLimit = std::variant<double, std::array<double, 2>>;
using AmountPerUnit = std::pair<std::string, double>;

struct Limit {
    std::string id;
    Subdivision subdivision;
    SizeLimit size;
    AmountPerUnit amountPerUnit;
};
}
