from src.Restaurant import Ingredient, StockItem, StockState


ingredients = [
    Ingredient("beef", "Beef", 5000, "g", 2.5),
    Ingredient("chicken", "Chicken", 5000, "g", 1.65),
    Ingredient("fish", "Fish", 5000, "g", 1.2),
    Ingredient("potato", "Potato", 800, "g", 0.77),
    Ingredient("tomato", "Tomato", 0, "g", 0.18),
]


stock_items = list(
    map(
        lambda ingredient: StockItem(
            ingredient=ingredient,
            available_quantity=ingredient.quantity,
            state=(
                StockState.EMPTY
                if ingredient.quantity == 0
                else StockState.LOW
                if ingredient.quantity < 1000
                else StockState.AVAILABLE
            ),
        ),
        ingredients,
    )
)


if __name__ == "__main__":
    for stock in stock_items:
        print(stock)
