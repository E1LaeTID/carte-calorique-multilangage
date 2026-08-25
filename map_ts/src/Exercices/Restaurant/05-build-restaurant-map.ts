import type {
  Ingredient,
  StockItem,
  StockLoss,
  StockLossKind,
  PreparedProduct,
  CalorieValue,
  RestaurantMap
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
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 0.77
  },
  {
    id: "tomato",
    name: "Tomato",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "salad",
    name: "Salad",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "oignon",
    name: "Oignon",
    quantity: 5000,
    unit: "g",
    caloriesPerUnit: 0.32
  },
];


const products: PreparedProduct[] = [
  {
    id: "beef-plate",
    name: "Beef Plate",

    ingredients: [
      {
        ingredientId: "beef",
        quantity: 180
      },
      {
        ingredientId: "potato",
        quantity: 150
      }
    ],

    availableUnits: 0
  },
  {
    id: "chicken-plate",
    name: "Chicken Plate",

    ingredients: [
      {
        ingredientId: "chicken",
        quantity: 180
      },
      {
        ingredientId: "salad",
        quantity: 150
      }
    ],

    availableUnits: 0
  },
  {
    id: "fish-plate",
    name: "Fish Plate",

    ingredients: [
      {
        ingredientId: "fish",
        quantity: 180
      },
      {
        ingredientId: "oignon",
        quantity: 150
      }
    ],

    availableUnits: 0
  }

];


// --------------------------------------------------
// 1. Ingredient[] → StockItem[]
// --------------------------------------------------

const stocks: StockItem[] =
  ingredients.map(ingredient => {

    // À compléter
    return {
      ingredient: ingredient,
      availableQuantity: ingredient.quantity,
      state: ingredient.quantity > 0 ? "available" : "empty"
    };
  });


// --------------------------------------------------
// 2. StockItem[] → StockLoss[]
// --------------------------------------------------

const preparationLosses: StockLoss[] =
  stocks.map(stock => {

    // À compléter
    return {
          sourceId: "main_loss",
        
          kind: "preparation" as StockLossKind,
        
          quantity: stock.availableQuantity * 0.02,
          unit: stock.ingredient.unit,
        
          reason: "Loss due to preparation",
        };

    throw new Error("À compléter");
  });


// --------------------------------------------------
// 3. PreparedProduct[] → PreparedProduct[]
// --------------------------------------------------

const availableProducts: PreparedProduct[] =
  products.map(product => {

    const possibleQuantityPerIngredient = product.ingredients.map(component => {
        const ingredient = ingredients.find(
            ingredient => ingredient.id === component.ingredientId
        );
        return ingredient ? ingredient.quantity / component.quantity : 0;
    });

    const availableQuantity = Math.min(...possibleQuantityPerIngredient);

    return {
      ...product,
      availableUnits: availableQuantity
    };
  });


// --------------------------------------------------
// 4. PreparedProduct[] → CalorieValue[]
// --------------------------------------------------

const calories: CalorieValue[] =
  availableProducts.map(product => {

    const ingredientCalories = product.ingredients.map(component => {
        const ingredient = ingredients.find(
            ingredient => ingredient.id === component.ingredientId
        );
        return ingredient ? component.quantity * ingredient.caloriesPerUnit : 0;
    });

    return {
      productId: product.id,
      calories: ingredientCalories.reduce((sum, calorie) => sum + calorie, 0)
    };
  });


// --------------------------------------------------
// 5. Construction de la carte
// --------------------------------------------------

const restaurantMap: RestaurantMap = {
  rawSources: ingredients,

  stocks,

  preparedProducts: availableProducts,

  preparationLosses,

  tableResetLosses: [],

  calories
};


console.log(restaurantMap);