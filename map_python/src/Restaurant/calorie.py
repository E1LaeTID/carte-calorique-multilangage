from dataclasses import dataclass


@dataclass(slots=True)
class CalorieValue:
    product_id: str
    calories: float
