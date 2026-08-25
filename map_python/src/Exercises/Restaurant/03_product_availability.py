from dataclasses import replace

from src.Restaurant import (
    Ingredient,
    PreparedProduct,
    ProductIngredient,
    StockItem,
    StockState,
)


ingredients = [
    Ingredient("beef", "Beef", 3600, "g", 2.5),
    Ingredient("chicken", "Chicken", 3600, "g", 1.65),
    Ingredient("fish", "Fish", 3600, "g", 1.2),
    Ingredient("potato", "Potato", 6000, "g", 0.77),
    Ingredient("salad", "Salad", 6000, "g", 0.18),
    Ingredient("oignon", "Oignon", 6000, "g", 0.32),
]

stocks = [
    StockItem(item, item.quantity, StockState.AVAILABLE)
    for item in ingredients
]

products = [
    PreparedProduct(
        "beef-plate",
        "Beef Plate",
        [ProductIngredient("beef", 180), ProductIngredient("potato", 150)],
    ),
    PreparedProduct(
        "chicken-plate",
        "Chicken Plate",
        [ProductIngredient("chicken", 180), ProductIngredient("salad", 150)],
    ),
    PreparedProduct(
        "fish-plate",
        "Fish Plate",
        [ProductIngredient("fish", 180), ProductIngredient("oignon", 150)],
    ),
]


def available_units(product: PreparedProduct) -> int:
    possible_quantities = list(
        map(
            lambda component: next(
                (
                    int(stock.available_quantity // component.quantity)
                    for stock in stocks
                    if stock.ingredient.id == component.ingredient_id
                ),
                0,
            ),
            product.ingredients,
        )
    )
    return min(possible_quantities, default=0)


available_products = list(
    map(
        lambda product: replace(product, available_units=available_units(product)),
        products,
    )
)


if __name__ == "__main__":
    for product in available_products:
        print(product)
