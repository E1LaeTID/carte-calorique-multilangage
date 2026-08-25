import type { Ingredient } from "./ingredient.js";

export type StockState =
  | "available"
  | "low"
  | "empty";

export type StockItem = {
  ingredient: Ingredient;

  availableQuantity: number;

  state: StockState;
};