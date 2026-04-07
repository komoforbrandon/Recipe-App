import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/favorite-context";

export default function Favorite() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-amber-950">
              Favorite recipes
            </h2>
            <p className="text-sm text-amber-900/75">
              Keep your best discoveries close and ready for the next meal.
            </p>
          </div>
          <p className="text-sm font-medium text-amber-900/70">
            {favorites.length} favorite{favorites.length === 1 ? "" : "s"}
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
