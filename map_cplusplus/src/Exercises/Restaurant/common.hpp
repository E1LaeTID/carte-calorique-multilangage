#pragma once
#include "Restaurant/all.hpp"
#include <vector>

namespace exercises {
inline std::vector<restaurant::Ingredient> makeIngredients() {
    return {
        {"beef", "Beef", 5000, "g", 2.5},
        {"chicken", "Chicken", 5000, "g", 1.65},
        {"fish", "Fish", 5000, "g", 1.2},
        {"potato", "Potato", 5000, "g", 0.77},
        {"tomato", "Tomato", 5000, "g", 0.18},
        {"salad", "Salad", 5000, "g", 0.18},
        {"oignon", "Oignon", 5000, "g", 0.32}
    };
}

inline std::vector<restaurant::PreparedProduct> makeProducts() {
    return {
        {"beef-plate", "Beef Plate", {{"beef", 180}, {"potato", 150}}, 0},
        {"chicken-plate", "Chicken Plate", {{"chicken", 180}, {"salad", 150}}, 0},
        {"fish-plate", "Fish Plate", {{"fish", 180}, {"oignon", 150}}, 0}
    };
}
}
