#pragma once
#include "ingredient.hpp"
namespace restaurant {
enum class StockState { Available, Low, Empty };
struct StockItem { Ingredient ingredient; double availableQuantity{0.0}; StockState state{StockState::Empty}; };
}
