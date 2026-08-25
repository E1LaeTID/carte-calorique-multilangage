from src.Restaurant import Ingredient, StockItem, StockLoss, StockLossKind, StockState


stocks = [
    StockItem(Ingredient("beef", "Beef", 5000, "g", 2.5), 5000, StockState.AVAILABLE),
    StockItem(Ingredient("chicken", "Chicken", 5000, "g", 1.65), 5000, StockState.AVAILABLE),
    StockItem(Ingredient("fish", "Fish", 5000, "g", 1.2), 5000, StockState.AVAILABLE),
    StockItem(Ingredient("potato", "Potato", 3000, "g", 0.77), 3000, StockState.AVAILABLE),
]


losses = list(
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


if __name__ == "__main__":
    for loss in losses:
        print(loss)
