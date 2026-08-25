from __future__ import annotations

from collections.abc import Callable, Iterable, Iterator
from typing import Generic, TypeVar

from .container_capacity import ContainerCapacity
from .operation import ExpandOperation, Operation

T = TypeVar("T")
U = TypeVar("U")
R = TypeVar("R")


class Container(Generic[T]):
    def __init__(
        self,
        name: str,
        items: Iterable[T],
        capacity: ContainerCapacity,
    ) -> None:
        self.name = name
        self._items = list(items)
        self.capacity = capacity
        self._sealed = False

    @property
    def length(self) -> int:
        return len(self._items)

    @property
    def is_sealed(self) -> bool:
        return self._sealed

    def __iter__(self) -> Iterator[T]:
        return iter(self._items)

    def to_list(self) -> list[T]:
        return list(self._items)

    def load(self, item: T) -> None:
        self._assert_open()
        self._items.append(item)

    def unload(self, index: int) -> T | None:
        self._assert_open()
        if index < 0 or index >= len(self._items):
            return None
        return self._items.pop(index)

    def move(self, source: int, target: int) -> None:
        self._assert_open()
        if not (0 <= source < len(self._items)) or not (0 <= target < len(self._items)):
            raise IndexError("Invalid move indexes")
        item = self._items.pop(source)
        self._items.insert(target, item)

    def seal(self) -> None:
        self._sealed = True

    def release(self) -> None:
        self._sealed = False

    def map(self, mapper: Callable[[T], U]) -> Container[U]:
        return Container(self.name, [mapper(item) for item in self._items], self.capacity)

    def filter(self, predicate: Callable[[T], bool]) -> Container[T]:
        return Container(self.name, [item for item in self._items if predicate(item)], self.capacity)

    def reduce(self, reducer: Callable[[R, T], R], initial_value: R) -> R:
        accumulator = initial_value
        for item in self._items:
            accumulator = reducer(accumulator, item)
        return accumulator

    def flat_map(self, mapper: Callable[[T], list[U]]) -> Container[U]:
        flattened: list[U] = []
        for item in self._items:
            flattened.extend(mapper(item))
        return Container(self.name, flattened, self.capacity)

    def apply(self, operation: Operation[T, U]) -> Container[U]:
        return self.map(operation.instruction)

    def expand(self, operation: ExpandOperation[T, U]) -> Container[U]:
        return self.flat_map(operation.instruction)

    def merge(self, other: Container[T]) -> Container[T]:
        return Container(
            f"{self.name}+{other.name}",
            [*self._items, *other.to_list()],
            self.capacity,
        )

    def split(self, predicate: Callable[[T], bool]) -> tuple[Container[T], Container[T]]:
        accepted = [item for item in self._items if predicate(item)]
        rejected = [item for item in self._items if not predicate(item)]
        return (
            Container(f"{self.name}:accepted", accepted, self.capacity),
            Container(f"{self.name}:rejected", rejected, self.capacity),
        )

    def combine(self, other: Container[U]) -> Container[tuple[T, U]]:
        return Container(
            f"{self.name}+{other.name}",
            list(zip(self._items, other.to_list())),
            self.capacity,
        )

    def _assert_open(self) -> None:
        if self._sealed:
            raise RuntimeError(f'Container "{self.name}" is sealed.')
