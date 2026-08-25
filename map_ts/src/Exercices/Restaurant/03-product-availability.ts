import type {
  Ingredient,
  StockItem,
  PreparedProduct
} from "../../Restaurant/index.js";


const ingredients: Ingredient[] = [
  {
    id: "beef",
    name: "Beef",
    quantity: 3600,
    unit: "g",
    caloriesPerUnit: 2.5
  },
  {
    id: "chicken",
    name: "Chicken",
    quantity: 3600,
    unit: "g",
    caloriesPerUnit: 1.65
  },
  {
    id: "fish",
    name: "Fish",
    quantity: 3600,
    unit: "g",
    caloriesPerUnit: 1.2
  },
  {
    id: "potato",
    name: "Potato",
    quantity: 6000,
    unit: "g",
    caloriesPerUnit: 0.77
  },
  {
    id: "tomato",
    name: "Tomato",
    quantity: 6000,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "salad",
    name: "Salad",
    quantity: 6000,
    unit: "g",
    caloriesPerUnit: 0.18
  },
  {
    id: "oignon",
    name: "Oignon",
    quantity: 6000,
    unit: "g",
    caloriesPerUnit: 0.32
  },
];


const stocks: StockItem[] = ingredients.map(
  ingredient => ({
    ingredient,
    availableQuantity: ingredient.quantity,
    state: "available"
  })
);


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


const availableProducts =
  products.map(product => {

    const possibleQuantities =
      product.ingredients.map(component => {

        // EXERCICE :
        //
        // 1. chercher le StockItem correspondant
        //    avec stocks.find(...)
        const stock = stocks.find(stock => stock.ingredient.id === component.ingredientId);
        // 2. calculer :
        //
        // stock disponible
        // ----------------
        // quantité requise
        const possibleQuantity = stock ? stock.availableQuantity / component.quantity : 0;
        // 3. retourner Math.floor(...)

        return Math.floor(possibleQuantity);
      });


    // EXERCICE :
    //
    // availableUnits doit être
    // la plus petite valeur
    // de possibleQuantities.

    return {
      ...product,

      availableUnits: Math.min(...possibleQuantities)
    };
  });


console.log(availableProducts);