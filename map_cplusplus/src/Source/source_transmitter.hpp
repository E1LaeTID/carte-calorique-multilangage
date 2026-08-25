#pragma once
#include "source.hpp"
#include "staff.hpp"
#include "skill.hpp"
#include <string>
#include <vector>

namespace mapcore {
struct Transmitter {
    std::string label;
    std::string message;
    std::string objectRef;
    Staff chief;
    std::vector<Skill> skills;
    double staffLimit{0};
    double actionLimit{0};
    double valueLimit{0};
};
using ContainerDestination = std::string;
struct SourceTransmitter { Source source; Transmitter transmitter; ContainerDestination receiver; };
}
