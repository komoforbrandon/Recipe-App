export type Meal = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
};

export type RecipeResponse = {
  meals: Meal[] | null;
};
