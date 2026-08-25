from dataclasses import replace
from functools import reduce
from pprint import pprint

from src.Restaurant import (
    CalorieValue,
    Ingredient,
    PreparedProduct,
    ProductIngredient,
    RestaurantMap,
    StockItem,
    StockLoss,
    StockLossKind,
    StockState,
)


ingredients = [
    Ingredient("beef", "Beef", 5000, "g", 2.5),
    Ingredient("chicken", "Chicken", 5000, "g", 1.65),
    Ingredient("fish", "Fish", 5000, "g", 1.2),
    Ingredient("potato", "Potato", 5000, "g", 0.77),
    Ingredient("tomato", "Tomato", 5000, "g", 0.18),
    Ingredient("salad", "Salad", 5000, "g", 0.18),
    Ingredient("oignon", "Oignon", 5000, "g", 0.32),
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

stocks = list(
    map(
        lambda ingredient: StockItem(
            ingredient,
            ingredient.quantity,
            StockState.AVAILABLE if ingredient.quantity > 0 else StockState.EMPTY,
        ),
        ingredients,
    )
)

preparation_losses = list(
    map(
        lambda stock: StockLoss(
            source_id=stock.ingredient.id,
            kind=StockLossKind.PREPARATION,
            quantity=stock.available_quantity * 0.02,
            unit=stock.ingredient.unit,
            reason="Loss due to preparation",
        ),
        stocks,
    )
)


def product_availability(product: PreparedProduct) -> int:
    quantities = list(
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
    return min(quantities, default=0)


available_products = list(
    map(
        lambda product: replace(product, available_units=product_availability(product)),
        products,
    )
)


def component_calories(component: ProductIngredient) -> float:
    ingredient = next(
        (item for item in ingredients if item.id == component.ingredient_id),
        None,
    )
    return 0.0 if ingredient is None else component.quantity * ingredient.calories_per_unit


calories = list(
    map(
        lambda product: CalorieValue(
            product.id,
            reduce(
                lambda total, value: total + value,
                map(component_calories, product.ingredients),
                0.0,
            ),
        ),
        available_products,
    )
)

restaurant_map = RestaurantMap(
    raw_sources=ingredients,
    stocks=stocks,
    prepared_products=available_products,
    preparation_losses=preparation_losses,
    table_reset_losses=[],
    calories=calories,
)


if __name__ == "__main__":
    pprint(restaurant_map)
