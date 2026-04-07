export type Meal = {
  idMeal: string;
  strArea: string;
  strCategory: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
  strSource: string;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
};

export type RecipeResponse = {
  meals: Meal[] | null;
};

export type RecipeCardProps = {
  recipe: Meal;
  isFavorite?: boolean;
  onToggleFavorite?: (meal: Meal) => void;
};

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};
export type RecipeModalProps = {
  onClose?: () => void;
  isOpen: boolean;
  recipe: Meal;
};

export type IngredientItem = {
  ingredient: string;
  measure: string | undefined;
};
