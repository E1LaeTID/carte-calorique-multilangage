#include "common.hpp"
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

int main() {
    auto ingredients = exercises::makeIngredients();
    auto products = exercises::makeProducts();

    std::vector<restaurant::CalorieValue> calorieValues;

    std::transform(products.begin(), products.end(), std::back_inserter(calorieValues),
        [&](const restaurant::PreparedProduct& product) {
            std::vector<double> componentCalories;
            std::transform(product.ingredients.begin(), product.ingredients.end(),
                std::back_inserter(componentCalories), [&](const restaurant::ProductIngredient& component) {
                    auto it = std::find_if(ingredients.begin(), ingredients.end(), [&](const auto& ingredient) {
                        return ingredient.id == component.ingredientId;
                    });
                    return it == ingredients.end() ? 0.0 : component.quantity * it->caloriesPerUnit;
                });

            const double total = std::accumulate(componentCalories.begin(), componentCalories.end(), 0.0);
            return restaurant::CalorieValue{product.id, total};
        });

    for (const auto& c : calorieValues) std::cout << c.productId << ": " << c.calories << " kcal\n";
}
