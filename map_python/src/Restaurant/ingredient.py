from dataclasses import dataclass


@dataclass(slots=True)
class Ingredient:
    id: str
    name: str
    quantity: float
    unit: str
    calories_per_unit: float
