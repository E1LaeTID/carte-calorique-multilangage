import type {
  Ingredient,
  StockItem,
  StockLoss,
  StockLossKind
} from "../../Restaurant/index.js";


const beef: Ingredient = {
  id: "beef",
  name: "Beef",
  quantity: 5000,
  unit: "g",
  caloriesPerUnit: 2.5
};

const chicken: Ingredient = {
  id: "chicken",
  name: "Chicken",
  quantity: 5000,
  unit: "g",
  caloriesPerUnit: 1.65
};

const fish: Ingredient = {
  id: "fish",
  name: "Fish",
  quantity: 5000,
  unit: "g",
  caloriesPerUnit: 1.2
};

const potato: Ingredient = {
  id: "potato",
  name: "Potato",
  quantity: 3000,
  unit: "g",
  caloriesPerUnit: 0.77
};

const tomato: Ingredient = {
  id: "tomato",
  name: "Tomato",
  quantity: 3000,
  unit: "g",
  caloriesPerUnit: 0.18
};

const salad: Ingredient = {
  id: "salad",
  name: "Salad",
  quantity: 3000,
  unit: "g",
  caloriesPerUnit: 0.18
};

const oignon: Ingredient = {
  id: "oignon",
  name: "Oignon",
  quantity: 3000,
  unit: "g",
  caloriesPerUnit: 0.32
};

const stocks: StockItem[] = [
  {
    ingredient: beef,
    availableQuantity: 5000,
    state: "available"
  },
  {
    ingredient: chicken,
    availableQuantity: 5000,
    state: "available"
  },
  {
    ingredient:fish ,
    availableQuantity: 5000,
    state: "available"
  },
  {
    ingredient: potato,
    availableQuantity: 3000,
    state: "available"
  },
  {
    ingredient: tomato,
    availableQuantity: 3000,
    state: "available"
  },
  {
    ingredient: salad,
    availableQuantity: 3000,
    state: "available"
  },
  {
    ingredient: oignon,
    availableQuantity: 3000,
    state: "available"
  }
];


const losses: StockLoss[] = stocks.map(
  (stock): StockLoss => {

    // EXERCICE :
    //
    // calculer 2 % de :
    //
    // stock.availableQuantity
    //
    // puis retourner un StockLoss.
    return {
      sourceId: "main_loss",
    
      kind: "preparation" as StockLossKind,
    
      quantity: stock.availableQuantity * 0.02,
      unit: stock.ingredient.unit,
    
      reason: "Loss due to preparation",
    };

    throw new Error("À compléter");
  }
);


console.log(losses);