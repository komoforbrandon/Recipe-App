import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../context/favorite-context";

export default function Favorite() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="relative overflow-hidden rounded-4xl border border-amber-700/10 bg-linear-gradient-to-br from-amber-600/10 via-amber-800/15 to-amber-100 px-6 py-10 shadow-sm sm:px-8 lg:px-12">
        <div className="absolute -right-16 top-0 h-44 w-44 rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="relative space-y-5">
          <p className="inline-flex rounded-full bg-amber-900/10 px-4 py-1 text-sm font-medium text-amber-900">
            Saved Recipes
          </p>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-black tracking-tight text-amber-950 sm:text-5xl">
              Your favorite meals, all in one place.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-amber-900/80 sm:text-lg">
              Every recipe you heart on the home page appears here with the same
              card design, so it is easy to revisit the meals you want to cook
              again.
            </p>
          </div>
        </div>
      </section>

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
