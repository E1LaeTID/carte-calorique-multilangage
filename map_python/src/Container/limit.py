from dataclasses import dataclass


@dataclass(slots=True)
class Limit:
    id: str
    subdivision_unit: str
    subdivision_quantity: int
    size: float | tuple[float, float]
    amount_unit: str
    amount_per_unit: float
