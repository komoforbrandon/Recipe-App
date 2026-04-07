import ExploreBar from "../components/ExploreBar";
import Loader from "../components/Loader";
import fetchRecipe from "../services/api";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "../components/RecipeCard";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/favorite-context";
import type { Meal } from "../types/recipeType";
import SignUp from "../components/signUp";


export default function Home() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const searchTerm = searchParams.get("q") || "";

  const categories = [
    "All",
    "Seafood",
    "Dessert",
    "Vegetarian",
    "Beef",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian",
    "Breakfast",
  ];

  const handleExplore = (term: string) => {
    navigate(`/?q=${encodeURIComponent(term)}`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => fetchRecipe(searchTerm)
  })

  console.log('This is the data fetch from the api',data)


  return (
    <main className="my-4 flex flex-col gap-4 sm:my-6">
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <h3 className="text-xs font-medium tracking-[0.2em] text-green-800 sm:text-sm">
          CURATED FLAVORS
        </h3>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
          What are we <i className="font-medium text-yellow-700/90">Crafting</i>today?
        </h1>
        <ExploreBar onExplore={handleExplore} />
      </div>

       <div>
        <h2 className="text-2xl font-bold text-amber-950">Category</h2>
        <div className="m-2 flex flex-row gap-3 overflow-x-auto md:overflow-visible h-fit">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleExplore(category === "All" ? " " : category)}
              className="rounded-lg bg-amber-700/10 px-3 py-2 text-sm cursor-pointer font-medium text-amber-800 hover:bg-amber-700/20 transition-colors duration-200 h-fit whitespace-nowrap"
              aria-label={`Explore ${category} recipes`}
            >
              {category}
            </button>
          ))}
        </div>
       </div>
      
        {isLoading && <Loader />}
        {isError && <p className="text-red-500 text-center p-3 border border-red-500 rounded-xl">An error occurred: {error.message}</p>}
        {data && (
            <section className="mx-auto w-full max-w-7xl px-4 py-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {data?.meals?.map((recipe: Meal) => (
                  <RecipeCard 
                    key={recipe.idMeal} 
                    recipe={recipe} 
                    isFavorite={isFavorite(recipe.idMeal)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </section>
        )}

        {data?.meals === null && (
          <p className="text-gray-500 text-center p-3 border border-gray-300 rounded-xl">No recipes found for "{searchTerm}". Try searching for something else!</p>
        )}
    <SignUp />
    </main>
  );
}
