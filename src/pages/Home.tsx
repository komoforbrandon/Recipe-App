import ExploreBar from "../components/ExploreBar";
import Loader from "../components/Loader";
import fetchRecipe from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => fetchRecipe(searchTerm)
  })



  return (
    <main className="my-4 flex flex-col gap-4 sm:my-6">
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <h3 className="text-xs font-medium tracking-[0.2em] text-green-800 sm:text-sm">
          CURATED FLAVORS
        </h3>
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl">
          What are we <i className="font-medium text-yellow-700/90">Crafting</i>today?
        </h1>
        <ExploreBar />
      </div>
    </main>
  );
}
