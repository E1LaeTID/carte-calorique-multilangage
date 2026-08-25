#pragma once
#include "ingredient.hpp"
#include "stock_item.hpp"
#include "prepared_product.hpp"
#include "stock_loss.hpp"
#include "calorie.hpp"
#include <vector>
namespace restaurant {
struct RestaurantMap {
    std::vector<Ingredient> rawSources;
    std::vector<StockItem> stocks;
    std::vector<PreparedProduct> preparedProducts;
    std::vector<StockLoss> preparationLosses;
    std::vector<StockLoss> tableResetLosses;
    std::vector<CalorieValue> calories;
};
}
