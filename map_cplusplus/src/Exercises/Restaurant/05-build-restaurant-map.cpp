#include "common.hpp"
#include <algorithm>
#include <iostream>
#include <limits>
#include <numeric>

int main() {
    auto ingredients = exercises::makeIngredients();
    auto products = exercises::makeProducts();

    std::vector<restaurant::StockItem> stocks;
    std::transform(ingredients.begin(), ingredients.end(), std::back_inserter(stocks), [](const auto& ingredient) {
        auto state = ingredient.quantity <= 0 ? restaurant::StockState::Empty
                   : ingredient.quantity < 1000 ? restaurant::StockState::Low
                   : restaurant::StockState::Available;
        return restaurant::StockItem{ingredient, ingredient.quantity, state};
    });

    std::vector<restaurant::StockLoss> preparationLosses;
    std::transform(stocks.begin(), stocks.end(), std::back_inserter(preparationLosses), [](const auto& stock) {
        return restaurant::StockLoss{stock.ingredient.id, restaurant::StockLossKind::Preparation,
                                     stock.availableQuantity * 0.02, stock.ingredient.unit,
                                     std::string{"Loss due to preparation"}};
    });

    for (auto& product : products) {
        int available = std::numeric_limits<int>::max();
        for (const auto& component : product.ingredients) {
            auto it = std::find_if(stocks.begin(), stocks.end(), [&](const auto& stock) {
                return stock.ingredient.id == component.ingredientId;
            });
            int possible = (it == stocks.end() || component.quantity <= 0)
                ? 0
                : static_cast<int>(it->availableQuantity / component.quantity);
            available = std::min(available, possible);
        }
        product.availableUnits = product.ingredients.empty() ? 0 : available;
    }

    std::vector<restaurant::CalorieValue> calories;
    std::transform(products.begin(), products.end(), std::back_inserter(calories), [&](const auto& product) {
        double total = 0.0;
        for (const auto& component : product.ingredients) {
            auto it = std::find_if(ingredients.begin(), ingredients.end(), [&](const auto& ingredient) {
                return ingredient.id == component.ingredientId;
            });
            if (it != ingredients.end()) total += component.quantity * it->caloriesPerUnit;
        }
        return restaurant::CalorieValue{product.id, total};
    });

    restaurant::RestaurantMap restaurantMap{
        ingredients,
        stocks,
        products,
        preparationLosses,
        {},
        calories
    };

    std::cout << "Restaurant map built\n"
              << "Sources: " << restaurantMap.rawSources.size() << '\n'
              << "Stocks: " << restaurantMap.stocks.size() << '\n'
              << "Products: " << restaurantMap.preparedProducts.size() << '\n';
}
