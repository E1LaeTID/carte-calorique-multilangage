from dataclasses import dataclass, field

from .calorie import CalorieValue
from .ingredient import Ingredient
from .prepared_product import PreparedProduct
from .stock_item import StockItem
from .stock_loss import StockLoss


@dataclass(slots=True)
class RestaurantMap:
    raw_sources: list[Ingredient] = field(default_factory=list)
    stocks: list[StockItem] = field(default_factory=list)
    prepared_products: list[PreparedProduct] = field(default_factory=list)
    preparation_losses: list[StockLoss] = field(default_factory=list)
    table_reset_losses: list[StockLoss] = field(default_factory=list)
    calories: list[CalorieValue] = field(default_factory=list)
