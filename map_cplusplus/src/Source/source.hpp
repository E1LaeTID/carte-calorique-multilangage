#pragma once
#include "strategy.hpp"
#include "staff.hpp"
#include "skill.hpp"
#include <string>
#include <vector>

namespace mapcore {
struct SourceStrategy { std::string name; Strategy strategy; };
struct SourceCourse { std::string content; std::vector<Skill> gain; double price{0.0}; };
struct SourceChart { std::string communicationPolicy; std::vector<std::string> ethicalLine; };
enum class SourceState { Incomplete, Complete, Active, Passive, Depleted, Saturated };
struct Source {
    SourceStrategy strategy;
    std::vector<Staff> team;
    std::vector<SourceCourse> courses;
    SourceChart chart;
    SourceState state{SourceState::Incomplete};
};
}
