import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type {
  Meal,
  IngredientItem,
  ModalProps,
  RecipeModalProps,
} from "../types/recipeType";
import {
  Globe,
  CirclePlay,
  ArrowRight,
  ArrowLeft,
  Heart,
  LayoutGrid,
  Circle,
} from "lucide-react";

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
    .split(/\r?\n|\.\s+|step\s+\d+/)
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
    <div className="sticky inset-0 z-100 w-screen h-full bg-black/50 md:h-screen md:w-screen">
      <div className="relative mx-auto bg-black/50 flex max-w-screen items-center justify-center md:h-fit md:w-full">
        {children}
      </div>
    </div>,
    document.body,
  );
}
export default function RecipeModal({ isOpen, recipe }: RecipeModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [color, setColor] = useState("gray");

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const footeritems = ["Privacy Policy", "Terms of Service", "Contact Us"];

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full overflow-hidden border border-amber-800/12 bg-white/85 shadow-[0_24px_80px_rgba(69,26,3,0.22)]">
          <div className="flex max-h-screen flex-col overflow-hidden sm:max-h-screen md:h-screen w-full">
            <button
              type="button"
              className="absolute z-10 top-2 left-2 p-1 md:p-2 shrink-0 flex items-center justify-center rounded-full border border-amber-200 bg-white/90 text-amber-900 shadow-sm transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close recipe details"
            >
              <ArrowLeft size={25} />
            </button>

            <div className="absolute z-10 top-2 right-3 bg-white/90 p-1 flex rounded-full border border-amber-200/80 md:p-2 md:mr-4">
              <Heart
                size={25}
                fill={color}
                stroke={color}
                onClick={() => setColor("red")}
                className="active:bg-amber-700 focus:bg-red-600"
              />
            </div>

            <div className="overflow-y-auto sm:px-0 sm:py-0">
              <div className="grid gap-5">
                <section className="">
                  <div className="relative overflow-hidden rounded-sm border-amber-200/80 bg-white shadow-sm">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="aspect-3/2 w-full  object-cover object-center sm:aspect-3/1"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-(--bg) via-slate-950/30 to-transparent " />
                  </div>

                  <div className="relative w-[98%] h-fit bg-white/95 rounded-2xl px-2 py-3 -mt-2 mx-auto shadow-sm sm:p-6">
                    <div className="flex gap-2">
                      <div className="bg-green-300/40 rounded-md py-2 px-3">
                        <Globe
                          size={18}
                          className="inline-block text-green-950"
                        />
                        <span className="ml-1 text-xs font-medium tracking-wide text-amber-900 uppercase">
                          {recipe.strArea}
                        </span>
                      </div>

                      <div className="bg-yellow-300/40 rounded-md py-2 px-3">
                        <LayoutGrid
                          size={18}
                          className="inline-block text-yellow-800"
                        />
                        <span className="ml-1 text-xs font-medium tracking-wide text-amber-900 uppercase">
                          {recipe.strCategory}
                        </span>
                      </div>

                      {recipe.strTags && (
                        <div className="bg-gray-200/60 rounded-md py-2 px-3">
                          <span className="ml-1 text-xs font-medium tracking-wide text-amber-900 uppercase">
                            {recipe.strTags.split(",").join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                    <h2 className="mt-2 text-3xl font-bold text-black">
                      {recipe.strMeal}
                    </h2>
                    <p className="mt-1 text-lg text-gray-800">
                      {recipe.strInstructions.length > 150
                        ? `${recipe.strInstructions.slice(0, 150)}...`
                        : recipe.strInstructions}
                    </p>
                  </div>
                </section>
                <section className="grid gap-5 md:grid-cols-[1fr_2fr]">
                  <aside className="rounded-3xl p-5 shadow-sm sm:sticky h-fit">
                    <h3 className="mb-1 text-lg font-bold text-black">
                      Ingredients
                    </h3>
                    <p className="mb-4 text-sm text-gray-800">
                      Everything you need to bring this dish together.
                    </p>
                    <ul className="grid gap-3">
                      {getIngredients(recipe).map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 rounded-2xl border border-amber-800/10 bg-gray-200/60 px-3 py-2 text-sm text-amber-950"
                        >
                          <Circle
                            size={18}
                            className="mt-0.5 shrink-0 text-yellow-700"
                          />
                          <div className="space-y-0.5">
                            <p className="font-semibold">{item.ingredient}</p>
                            {item.measure && (
                              <p className="text-xs font-medium tracking-wide text-gray-500/70 uppercase">
                                {item.measure}
                              </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-2 border-t border-amber-800/10">
                      <div className="text-xs text-amber-900/80 p-3 rounded-2xl bg-amber-800/12 text-center">
                        <a
                          href={recipe.strYoutube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-lg font-medium items-center gap-1 cursor-pointer text-red-500 hover:text-red-600"
                        >
                          <CirclePlay size={25} />
                          Watch on YouTube
                        </a>
                      </div>

                      <a
                        href={recipe.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 cursor-pointer"
                        aria-label="View Original Recipe"
                      >
                        View Original Recipe
                        <ArrowRight size={16} className="text-orange-500" />
                      </a>
                    </div>
                  </aside>
                  <div className="rounded-3xl p-5 shadow-sm">
                    <h3 className="mb-3 text-lg font-bold text-amber-950">
                      Preparation Steps
                    </h3>
                    <ol className="space-y-3">
                      {getInstructionSteps(recipe.strInstructions).map(
                        (step, index) => (
                          <li
                            key={index}
                            className="flex gap-3 rounded-2xl px-4 py-4 text-md my-2 leading-6 text-black sm:text-[21px]"
                          >
                            <span className="flex p-2 h-fit w-fit shrink-0 items-center justify-center rounded-full border border-amber-800/10 bg-gray-300/70 text-amber-900 text-md font-bold md:p-3">
                              0{index + 1}
                            </span>
                            <span className="flex items-center">{step}</span>
                          </li>
                        ),
                      )}
                    </ol>
                    <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3">
                      <iframe
                        width="100%"
                        src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
                        title={recipe.strMeal}
                        className="h-60 md:h-140 rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                </section>
                <footer className="mt-2 p-2 py-4 bg-gray-400/25">
                  <h3 className="text-center font-bold text-gray-600 text-lg">Saffront & Sage</h3>
                  <div className="flex gap-6 flex-row justify-center ">
                   {footeritems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-center text-md text-gray-500 hover:text-gray-700"
                    >
                      {item}
                    </a>
                  ))}
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
