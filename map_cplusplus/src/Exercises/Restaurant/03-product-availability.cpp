#include "common.hpp"
#include <algorithm>
#include <iostream>
#include <limits>

int main() {
    auto ingredients = exercises::makeIngredients();
    auto products = exercises::makeProducts();

    std::vector<restaurant::StockItem> stocks;
    for (const auto& i : ingredients) stocks.push_back({i, i.quantity, restaurant::StockState::Available});

    for (auto& product : products) {
        int available = std::numeric_limits<int>::max();
        for (const auto& component : product.ingredients) {
            auto it = std::find_if(stocks.begin(), stocks.end(), [&](const auto& s) {
                return s.ingredient.id == component.ingredientId;
            });
            int possible = 0;
            if (it != stocks.end() && component.quantity > 0) {
                possible = static_cast<int>(it->availableQuantity / component.quantity);
            }
            available = std::min(available, possible);
        }
        product.availableUnits = product.ingredients.empty() ? 0 : available;
        std::cout << product.name << ": " << product.availableUnits << " units\n";
    }
}
