#pragma once
#include "skill.hpp"
#include "shared_value.hpp"
#include <string>
#include <vector>
namespace mapcore {
struct Staff {
    std::string name;
    std::string position;
    std::vector<Skill> skills;
    std::vector<SharedValue> sharedValues;
};
}
