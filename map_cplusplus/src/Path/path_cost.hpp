#pragma once
#include "path_id.hpp"
#include <functional>
#include <string>
namespace mapcore {
struct PathCost {
    PathId path;
    double value{0.0};
    std::string unit;
    std::function<bool(double, double)> balanceChecker;
};
}
