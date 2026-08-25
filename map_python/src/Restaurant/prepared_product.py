from dataclasses import dataclass, field


@dataclass(slots=True)
class ProductIngredient:
    ingredient_id: str
    quantity: float


@dataclass(slots=True)
class PreparedProduct:
    id: str
    name: str
    ingredients: list[ProductIngredient] = field(default_factory=list)
    available_units: int = 0
