import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Meal } from "../types/recipeType";
const FAVORITES_STORAGE_KEY = "recipe-app-favorites";

type FavoritesContextValue = {
  favorites: Meal[];
  isFavorite: (idMeal: string) => boolean;
  toggleFavorite: (meal: Meal) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

function readStoredFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

  if (!storedFavorites) {
    return [];
  }

  try {
    return JSON.parse(storedFavorites) as Meal[];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>(readStoredFavorites);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite: (idMeal: string) =>
        favorites.some((meal) => meal.idMeal === idMeal),
      toggleFavorite: (meal: Meal) => {
        setFavorites((currentFavorites) =>
          currentFavorites.some((favorite) => favorite.idMeal === meal.idMeal)
            ? currentFavorites.filter(
                (favorite) => favorite.idMeal !== meal.idMeal
              )
            : [...currentFavorites, meal]
        );
      },
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
