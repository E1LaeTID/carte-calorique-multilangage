#pragma once
#include <array>
#include <string>

namespace mapcore {
using MemoryState = std::array<bool, 2>;

struct Memory {
    std::string id;
    MemoryState state{false, false};
};
}
