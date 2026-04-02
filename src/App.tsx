import "./App.css";
import NavBar from "./components/navbar";
import AppRouter from "./Router/routing";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-orange-950/6">
        <div className="bg-white w-full">
          <NavBar />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <AppRouter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
