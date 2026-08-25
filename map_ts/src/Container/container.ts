// container.ts

import type { ContainerCapacity } from "./container-capacity.js";

import type {
  Operation,
  ExpandOperation
} from "./operation.js";


export class Container<T> {

  private items: T[];

  public readonly name: string;
  public readonly capacity: ContainerCapacity;

  private sealed: boolean;


  constructor(
    name: string,
    items: T[],
    capacity: ContainerCapacity
  ) {
    this.name = name;
    this.items = [...items];
    this.capacity = capacity;
    this.sealed = false;
  }


  // --------------------------------------------------
  // ACCESSORS
  // --------------------------------------------------

  get length(): number {
    return this.items.length;
  }


  get isSealed(): boolean {
    return this.sealed;
  }


  toArray(): T[] {
    return [...this.items];
  }


  // --------------------------------------------------
  // ITERATION
  // --------------------------------------------------

  [Symbol.iterator](): Iterator<T> {
    return this.items[Symbol.iterator]();
  }


  // --------------------------------------------------
  // BASIC OPERATIONS
  // --------------------------------------------------

  load(item: T): void {

    if (this.sealed) {
      throw new Error(
        `Container "${this.name}" is sealed.`
      );
    }

    this.items.push(item);
  }


  unload(index: number): T | undefined {

    if (this.sealed) {
      throw new Error(
        `Container "${this.name}" is sealed.`
      );
    }

    if (
      index < 0 ||
      index >= this.items.length
    ) {
      return undefined;
    }

    const removedItems = this.items.splice(
      index,
      1
    );

    return removedItems[0];
  }


  move(
    from: number,
    to: number
  ): void {

    if (this.sealed) {
      throw new Error(
        `Container "${this.name}" is sealed.`
      );
    }

    if (
      from < 0 ||
      from >= this.items.length ||
      to < 0 ||
      to >= this.items.length
    ) {
      throw new RangeError(
        "Invalid move indexes."
      );
    }

    const removedItems = this.items.splice(
      from,
      1
    );

    const item = removedItems[0];

    if (item === undefined) {
      throw new Error(
        "Unable to move item."
      );
    }

    this.items.splice(
      to,
      0,
      item
    );
  }


  // --------------------------------------------------
  // CONTAINER STATE
  // --------------------------------------------------

  seal(): void {
    this.sealed = true;
  }


  release(): void {
    this.sealed = false;
  }


  // --------------------------------------------------
  // NATIVE-LIKE COLLECTION OPERATIONS
  // --------------------------------------------------

  map<U>(
    mapper: (
      item: T,
      index: number
    ) => U
  ): Container<U> {

    return new Container<U>(
      this.name,
      this.items.map(mapper),
      this.capacity
    );
  }


  filter(
    predicate: (
      item: T,
      index: number
    ) => boolean
  ): Container<T> {

    return new Container<T>(
      this.name,
      this.items.filter(predicate),
      this.capacity
    );
  }


  reduce<U>(
    reducer: (
      accumulator: U,
      item: T,
      index: number
    ) => U,
    initialValue: U
  ): U {

    return this.items.reduce(
      reducer,
      initialValue
    );
  }


  flatMap<U>(
    mapper: (
      item: T,
      index: number
    ) => U[]
  ): Container<U> {

    return new Container<U>(
      this.name,
      this.items.flatMap(mapper),
      this.capacity
    );
  }


  // --------------------------------------------------
  // MODEL OPERATIONS
  // --------------------------------------------------

  apply<U>(
    operation: Operation<T, U>
  ): Container<U> {

    return this.map(
      operation.instruction
    );
  }


  expand<U>(
    operation: ExpandOperation<T, U>
  ): Container<U> {

    return this.flatMap(
      operation.instruction
    );
  }


  // --------------------------------------------------
  // STRUCTURAL OPERATIONS
  // --------------------------------------------------

  merge(
    other: Container<T>
  ): Container<T> {

    return new Container<T>(
      `${this.name}+${other.name}`,
      [
        ...this.items,
        ...other.toArray()
      ],
      this.capacity
    );
  }


  split(
    predicate: (
      item: T
    ) => boolean
  ): [
    Container<T>,
    Container<T>
  ] {

    const accepted: T[] = [];
    const rejected: T[] = [];

    for (const item of this.items) {

      if (predicate(item)) {
        accepted.push(item);
      }
      else {
        rejected.push(item);
      }

    }

    return [
      new Container<T>(
        `${this.name}:accepted`,
        accepted,
        this.capacity
      ),

      new Container<T>(
        `${this.name}:rejected`,
        rejected,
        this.capacity
      )
    ];
  }


  combine<U>(
    other: Container<U>
  ): Container<[T, U]> {

    const otherItems = other.toArray();

    const limit = Math.min(
      this.items.length,
      otherItems.length
    );

    const combined: [T, U][] = [];

    for (
      let i = 0;
      i < limit;
      i++
    ) {

      combined.push([
        this.items[i]!,
        otherItems[i]!
      ]);
    }

    return new Container<[T, U]>(
      `${this.name}+${other.name}`,
      combined,
      this.capacity
    );
  }
}