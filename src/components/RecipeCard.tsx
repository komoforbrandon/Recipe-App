import type { RecipeCardProps } from "../types/recipeType";
import { useState } from "react";
import { Globe, Heart, ArrowRight } from "lucide-react";
import RecipeModal from "./Modal";

export default function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
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
          className="h-full w-full cursor-pointer object-cover object-center transition-transform duration-200 hover:scale-105 aspect-3/2 md:aspect-19/20"
        />
      </div>

      <div className="px-4 py-3 lg:px-6 lg:py-5">
        <article className="flex justify-between space-y-2">
            <span className="text-[13px] font-medium text-gray-500/60 uppercase">
              {recipe.strCategory} . 45 mins
            </span>
        </article>

        <div className="flex justify-between space-y-2">
          <h2 className="text-lg font-bold text-amber-950">{recipe.strMeal}</h2>
        </div>
        <a
          href={'#'}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          rel="noopener noreferrer"
          className="mt-1 inline-flex items-center gap-1 w-full justify-between font-light text-gray-800/75 hover:text-amber-950 transition-colors duration-200"
        >
         <p className="flex items-center uppercase text-center text-sm text-gray-800/80">
            <Globe size={20} color="gray" className="mr-1" />
            {recipe.strArea || 'N/A'}
          </p>
          <ArrowRight size={20} />
        </a>
      </div>
      <RecipeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        recipe={recipe}
      />
    </article>
  );
}
