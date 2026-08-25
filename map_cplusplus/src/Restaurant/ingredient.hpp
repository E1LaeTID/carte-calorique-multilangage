#pragma once
#include <string>
namespace restaurant {
struct Ingredient {
    std::string id;
    std::string name;
    double quantity{0.0};
    std::string unit;
    double caloriesPerUnit{0.0};
};
}
