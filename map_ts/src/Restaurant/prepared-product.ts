export type ProductIngredient = {
  ingredientId: string;
  quantity: number;
};

export type PreparedProduct = {
  id: string;
  name: string;

  ingredients: ProductIngredient[];

  availableUnits: number;
};