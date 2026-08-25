#pragma once
#include "memory.hpp"
#include "limit.hpp"

namespace mapcore {
struct ContainerCapacity {
    Memory memoryState;
    Limit limit;
};
}
