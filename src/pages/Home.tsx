import ExploreBar from "../components/ExploreBar";


export default function Home() {
  return (
    <main className="flex flex-col gap-4 my-4 mx-2">
      <div className="flex flex-col gap-2  w-1/2">
        <h3 className="text-2xs text-green-800 font-medium">CURATED FLAVORS</h3>
        <h1 className="font-extrabold text-7xl">What are we <i className="font-medium text-yellow-700/90">Crafting</i>today?</h1>
        <ExploreBar />
      </div>
    </main>
  );
}
