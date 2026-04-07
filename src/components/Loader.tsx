export default function Loader() {
  const placeholders = Array.from({ length: 8 }, (_, index) => index);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {placeholders.map((item) => (
          <article
            key={item}
            className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"
          >
            <div className="aspect-4/3 animate-pulse bg-amber-800/15" />

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-amber-500/15" />
                <div className="h-4 w-1/2 animate-pulse rounded-full bg-amber-400/15" />
              </div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-20 animate-pulse rounded-full bg-amber-400/14" />
                <div className="h-8 w-24 animate-pulse rounded-full bg-amber-500/15" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
