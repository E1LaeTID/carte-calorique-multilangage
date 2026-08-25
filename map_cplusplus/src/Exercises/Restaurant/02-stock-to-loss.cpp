#include "common.hpp"
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
    auto ingredients = exercises::makeIngredients();
    std::vector<restaurant::StockItem> stocks;
    for (const auto& i : ingredients) stocks.push_back({i, i.quantity, restaurant::StockState::Available});

    std::vector<restaurant::StockLoss> losses;
    std::transform(stocks.begin(), stocks.end(), std::back_inserter(losses),
        [](const restaurant::StockItem& stock) {
            return restaurant::StockLoss{
                stock.ingredient.id,
                restaurant::StockLossKind::Preparation,
                stock.availableQuantity * 0.02,
                stock.ingredient.unit,
                std::string{"Loss due to preparation"}
            };
        });

    std::cout << "Preparation losses: " << losses.size() << '\n';
}
