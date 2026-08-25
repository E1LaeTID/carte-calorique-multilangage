import type {
  Ingredient,
  PreparedProduct,
  CalorieValue
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

    availableUnits: 20
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

    availableUnits: 30
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

    availableUnits: 50
  }

];


const calories: CalorieValue[] =
  products.map(product => {

    const ingredientCalories =
      product.ingredients.map(component => {

        // EXERCICE :
        //
        // rechercher l'ingrédient
        // puis calculer :
        let ingredient = ingredients.find(ingredient => ingredient.id === component.ingredientId);
        // component.quantity
        // *
        // ingredient.caloriesPerUnit
        if (ingredient) {
          return component.quantity * ingredient.caloriesPerUnit;
        };

        throw new Error("No ingredient found");
      });


    // EXERCICE :
    //
    // utiliser reduce() afin de transformer :
    //
    // [450, 115.5]
    //
    // en :
    //
    // 565.5

    const totalCalories = ingredientCalories.reduce((sum, calories) => sum + calories, 0);


    return {
      productId: product.id,
      calories: totalCalories
    };
  });


console.log(calories);