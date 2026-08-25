import type { Ingredient } from "./ingredient.js";
import type { StockItem } from "./stock-item.js";
import type { PreparedProduct } from "./prepared-product.js";
import type { StockLoss } from "./stock-loss.js";
import type { CalorieValue } from "./calorie.js";

export type RestaurantMap = {
  rawSources: Ingredient[];

  stocks: StockItem[];

  preparedProducts: PreparedProduct[];

  preparationLosses: StockLoss[];

  tableResetLosses: StockLoss[];

  calories: CalorieValue[];
};