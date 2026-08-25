from functools import reduce

from src.Restaurant import CalorieValue, Ingredient, PreparedProduct, ProductIngredient


ingredients = [
    Ingredient("beef", "Beef", 3600, "g", 2.5),
    Ingredient("chicken", "Chicken", 3600, "g", 1.65),
    Ingredient("fish", "Fish", 3600, "g", 1.2),
    Ingredient("potato", "Potato", 6000, "g", 0.77),
    Ingredient("salad", "Salad", 6000, "g", 0.18),
    Ingredient("oignon", "Oignon", 6000, "g", 0.32),
]

products = [
    PreparedProduct(
        "beef-plate",
        "Beef Plate",
        [ProductIngredient("beef", 180), ProductIngredient("potato", 150)],
        20,
    ),
    PreparedProduct(
        "chicken-plate",
        "Chicken Plate",
        [ProductIngredient("chicken", 180), ProductIngredient("salad", 150)],
        20,
    ),
    PreparedProduct(
        "fish-plate",
        "Fish Plate",
        [ProductIngredient("fish", 180), ProductIngredient("oignon", 150)],
        20,
    ),
]


def ingredient_calories(component: ProductIngredient) -> float:
    ingredient = next(
        (item for item in ingredients if item.id == component.ingredient_id),
        None,
    )
    if ingredient is None:
        raise ValueError(f"Unknown ingredient: {component.ingredient_id}")
    return component.quantity * ingredient.calories_per_unit


calories = list(
    map(
        lambda product: CalorieValue(
            product_id=product.id,
            calories=reduce(
                lambda total, value: total + value,
                map(ingredient_calories, product.ingredients),
                0.0,
            ),
        ),
        products,
    )
)


if __name__ == "__main__":
    for value in calories:
        print(value)
