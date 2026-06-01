import "./App.css";
import NavBar from "./components/navbar";
import AppRouter from "./Router/routing";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/favorite-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
      <div className="min-h-screen bg-orange-950/6">
        <div className="bg-white w-full">
          <NavBar />
        </div>
        <div className="mx-auto w-full md:max-w-full px-4 sm:px-8">
          <AppRouter />
        </div>
      </div>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
