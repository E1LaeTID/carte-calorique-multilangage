#include "common.hpp"
#include <algorithm>
#include <iostream>
#include <iterator>

int main() {
    auto ingredients = exercises::makeIngredients();
    std::vector<restaurant::StockItem> stocks;
    stocks.reserve(ingredients.size());

    std::transform(ingredients.begin(), ingredients.end(), std::back_inserter(stocks),
        [](const restaurant::Ingredient& ingredient) {
            restaurant::StockState state = restaurant::StockState::Available;
            if (ingredient.quantity <= 0) state = restaurant::StockState::Empty;
            else if (ingredient.quantity < 1000) state = restaurant::StockState::Low;
            return restaurant::StockItem{ingredient, ingredient.quantity, state};
        });

    std::cout << "Stock items: " << stocks.size() << '\n';
}
