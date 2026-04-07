import type { RecipeCardProps} from "../types/recipeType";
import { useState } from "react";
import {
  Globe,
  Heart,
  Utensils,
  ArrowRight,
} from "lucide-react";
import RecipeModal from "./Modal";

export default function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-amber-700/10 bg-amber-500/4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative aspect-1 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <button
          type="button"
          aria-label={
            isFavorite
              ? `Remove ${recipe.strMeal} from favorites`
              : `Add ${recipe.strMeal} to favorites`
          }
          className="absolute top-2 right-2 z-10 rounded-full bg-white p-1 text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite?.(recipe);
          }}
        >
          <Heart
            size={20}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "fill-gray-300 text-gray-300"
            }
          />
        </button>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="h-full w-full cursor-pointer object-cover object-center transition-transform duration-200 hover:scale-105 aspect-3/2 md:aspect-4/3"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 bg-red-200/30 rounded-full px-2 py-1 mb-2 w-fit">
          <Utensils size={20} className="text-amber-800" />
          <span className="text-[14px] font-medium text-amber-900/80">
            {recipe.strCategory}
          </span>
        </div>
        <div className="flex justify-between space-y-2">
          <h2 className="text-lg font-bold text-amber-950">{recipe.strMeal}</h2>
          <p className="flex h-fit items-center rounded-2xl bg-amber-800/12 px-2 py-1 text-center text-sm text-amber-950">
            <Globe size={18} color="rgb(69, 26, 3)" className="mr-1" />
            {recipe.strArea}
          </p>
        </div>
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 font-light text-amber-900 hover:text-amber-950 transition-colors duration-200"
        >
          <span className="text-[14px]">View Recipe Source</span>
          <ArrowRight size={15} />
        </a>
      </div>
      <RecipeModal isOpen={isOpen} onClose={() => setIsOpen(false)} recipe={recipe} />
    </article>
  );
}
