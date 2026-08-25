#pragma once
#include <optional>
#include <string>
namespace restaurant {
enum class StockLossKind { Preparation, TableReset };
struct StockLoss {
    std::string sourceId;
    StockLossKind kind{StockLossKind::Preparation};
    double quantity{0.0};
    std::string unit;
    std::optional<std::string> reason;
};
}
