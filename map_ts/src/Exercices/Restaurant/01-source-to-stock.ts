import type {
  Ingredient,
  StockItem,
  StockState
} from "../../Restaurant/index.js";


const ingredients: Ingredient[] = [
  {
    id: "beef",
    name: "Beef",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 2.5
  },
  {
    id: "chicken",
    name: "Chicken",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 1.65
  },
  {
    id: "fish",
    name: "Fish",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 1.2
  },
  {
    id: "potato",
    name: "Potato",
    quantity: 800,
    unit: "g",
    caloriesPerUnit: 0.77
  },
  {
    id: "tomato",
    name: "Tomato",
    quantity: 0,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "salad",
    name: "Salad",
    quantity: 0,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "oignon",
    name: "Oignon",
    quantity: 0,
    unit: "g",
    caloriesPerUnit: 0.18
  },
];

const stockItems: StockItem[] = ingredients.map((ingredient) => ({
  ingredient,
  availableQuantity: ingredient.quantity,
  state: ingredient.quantity > 0 ? "available" : "empty"
}));