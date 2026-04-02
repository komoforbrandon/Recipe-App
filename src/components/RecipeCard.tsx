import type { Meal } from "../types/recipeType";
// import { useState, useEffect } from "react";
import { Globe, Heart} from "lucide-react";

type RecipeCardProps = {
  recipe: Meal;
  isFavorite?: boolean;
  onToggleFavorite?: (meal: Meal) => void;
};

export default function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-amber-700/10 bg-amber-500/4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3">
        <button
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${recipe.strMeal} from favorites`
              : `Add ${recipe.strMeal} to favorites`
          }
          className="absolute top-2 right-2 z-10 rounded-full bg-white p-1 text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={() => onToggleFavorite && onToggleFavorite(recipe)}
        >
          <Heart
            size={20}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-amber-950"
            }
          />
        </button>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-full w-full cursor-pointer object-cover object-center transition-transform duration-200 hover:scale-105"
        />
      </div>

      <div className="p-4">
      <div className="flex justify-between space-y-2">
        <h2 className="text-lg font-bold text-amber-950">{recipe.strMeal}</h2>
        <p className="flex h-fit items-center rounded-2xl bg-amber-800/12 px-2 py-1 text-center text-sm text-amber-950">
          <Globe size={18} color="rgb(69, 26, 3)" className="mr-1" />
          {recipe.strArea}
        </p>
      </div>
      </div>
    </article>
  );
}
