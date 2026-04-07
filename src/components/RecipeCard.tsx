import type { Meal } from "../types/recipeType";
import { useState, useEffect } from "react";
import { Globe, Heart, LucideCircleCheckBig, X } from "lucide-react";
import { createPortal } from "react-dom";

type RecipeCardProps = {
  recipe: Meal;
  isFavorite?: boolean;
  onToggleFavorite?: (meal: Meal) => void;
};

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

type IngredientItem = {
  ingredient: string;
  measure: string | undefined;
};

function getIngredients(recipe: Meal) {
  return Array.from({ length: 20 }, (_, index) => index + 1)
    .map((item) => {
      const ingredient = recipe[`strIngredient${item}`]?.trim();
      const measure = recipe[`strMeasure${item}`]?.trim();

      if (!ingredient) {
        return null;
      }

      return {
        ingredient,
        measure,
      };
    })
    .filter((item): item is IngredientItem => item !== null);
}

function getInstructionSteps(instructions: string) {
  return instructions
    .split(/\r?\n|\.\s+/)
    .map((step) => step.trim())
    .filter(Boolean);
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto px-3 py-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm"
        aria-label="Close recipe modal"
        onClick={onClose}
      />
      <div className="relative mx-auto flex min-h-full max-w-6xl items-center justify-center">
        {children}
      </div>
    </div>,
    document.body,
  );
}
export default function RecipeCard({
  recipe,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ingredients = getIngredients(recipe);
  const instructionSteps = getInstructionSteps(recipe.strInstructions);

  return (
    <article className="overflow-hidden rounded-2xl border border-amber-700/10 bg-amber-500/4 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-1 cursor-pointer" onClick={() => setIsOpen(true)}>
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
              isFavorite ? "fill-red-500 text-red-500" : "fill-gray-300 text-gray-300"
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
        <div className="flex justify-between space-y-2">
          <h2 className="text-lg font-bold text-amber-950">{recipe.strMeal}</h2>
          <p className="flex h-fit items-center rounded-2xl bg-amber-800/12 px-2 py-1 text-center text-sm text-amber-950">
            <Globe size={18} color="rgb(69, 26, 3)" className="mr-1" />
            {recipe.strArea}
          </p>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full overflow-hidden rounded-4xl border border-amber-800/12 bg-linear-to-b from-amber-800/20 via-stone-50 to-amber-600/25 shadow-[0_24px_80px_rgba(69,26,3,0.22)]">
          <div className="flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden sm:max-h-[calc(100vh-4rem)]">
            <div className="sticky top-0 z-10 border-b border-amber-900/10 bg-amber-200/45 px-4 py-4 backdrop-blur sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase">
                    <span className="rounded-full bg-amber-700/40 px-3 py-1 text-[11px]">
                      Recipe Details
                    </span>
                    {recipe.strCategory && (
                      <span className="rounded-full border border-amber-300/80 px-3 py-1 text-[11px] text-amber-800">
                        {recipe.strCategory}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black leading-tight text-amber-950 sm:text-3xl">
                      {recipe.strMeal}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-amber-900/80">
                      <span className="inline-flex items-center rounded-full bg-amber-800/12 px-3 py-1.5 font-medium text-amber-950">
                        <Globe size={16} className="mr-2" />
                        {recipe.strArea}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-200 bg-white/90 text-amber-900 shadow-sm transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close recipe details"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <section className="space-y-5">
                  <div className="overflow-hidden rounded-3xl border border-amber-200/80 bg-white shadow-sm">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="aspect-4/3 w-full object-cover object-center"
                    />
                  </div>

                  <div className="rounded-3xl border border-amber-800/10 bg-white/10 p-5 shadow-sm">
                    <h3 className="mb-3 text-lg font-bold text-amber-950">Instructions</h3>
                    <ol className="space-y-3">
                      {instructionSteps.map((step, index) => (
                        <li
                          key={index}
                          className="flex gap-3 rounded-2xl bg-amber-600/12 px-4 py-3 text-sm leading-6 text-black sm:text-[15px]"
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-900 text-xs font-bold text-amber-50">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                <aside className="rounded-3xl border border-amber-200/80 bg-300/20 p-5 shadow-sm sm:sticky h-fit">
                  <h3 className="mb-1 text-lg font-bold text-amber-950">Ingredients</h3>
                  <p className="mb-4 text-sm text-amber-900/65">
                    Everything you need to bring this dish together.
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {ingredients.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-amber-800/10 bg-amber-600/12 px-4 py-3 text-sm text-amber-950"
                      >
                        <LucideCircleCheckBig
                          size={18}
                          className="mt-0.5 shrink-0 text-green-600"
                        />
                        <div className="space-y-0.5">
                          <p className="font-semibold">{item.ingredient}</p>
                          {item.measure && (
                            <p className="text-xs font-medium tracking-wide text-amber-900 uppercase">
                              {item.measure}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}
