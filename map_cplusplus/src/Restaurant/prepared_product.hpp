#pragma once
#include <string>
#include <vector>
namespace restaurant {
struct ProductIngredient { std::string ingredientId; double quantity{0.0}; };
struct PreparedProduct {
    std::string id;
    std::string name;
    std::vector<ProductIngredient> ingredients;
    int availableUnits{0};
};
}
