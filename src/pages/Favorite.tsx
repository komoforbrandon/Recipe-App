import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/favorite-context";

export default function Favorite() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const handleClearFavorites = () => {
    favorites.forEach((recipe) => toggleFavorite(recipe));
  }

  return (
    <div className="mx-auto w-full max-full px-4 py-8">
      <section className="mt-5">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs mb-4 font-medium tracking-[0.2em] text-amber-600 uppercase sm:text-sm">
              curated collection
            </p>
            <h2 className="text-4xl mb-3 font-bold text-black/90 sm:text-5xl lg:text-6xl">
             My  Favorites
            </h2>
            <p className="text-sm text-amber-900/75">
              Keep your best discoveries close and ready for the next meal.
            </p>
          </div>
          <p className="flex gap-5 flex-col md:flex-row text-sm font-medium text-amber-900/70">
          <span>{favorites.length} Recipe{favorites.length === 1 ? "" : "s"} Saved </span>
          <span
           className="underline hover:text-amber-700 cursor-pointer transition-colors duration-200"
           onClick={handleClearFavorites}
          >Clear All</span>
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isFavorite={isFavorite(recipe.idMeal)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-700/10 bg-white/60 px-4 py-10 text-center text-amber-900">
            <h2 className="text-2xl font-bold text-amber-950">
              No favorites yet
            </h2>
            <p className="mt-2 text-sm text-amber-900/75">
              Tap the heart on any recipe card from the home page and it will
              appear here automatically.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
