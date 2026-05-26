export default function Loader() {
  const placeholders = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="mx-auto w-full max-full px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {placeholders.map((item) => (
          <article
            key={item}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm p-4"
          >
            <div className="aspect-4/3 md:aspect-19/20 animate-pulse bg-gray-300 rounded-2xl" />

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-300" />
              </div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
