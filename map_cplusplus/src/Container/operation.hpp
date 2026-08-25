#pragma once
#include <functional>
#include <string>
#include <vector>

namespace mapcore {
template <typename TInput, typename TOutput = TInput>
struct Operation {
    std::string name;
    std::function<TOutput(const TInput&)> instruction;
};

template <typename TInput, typename TOutput = TInput>
struct ExpandOperation {
    std::string name;
    std::function<std::vector<TOutput>(const TInput&)> instruction;
};
}
