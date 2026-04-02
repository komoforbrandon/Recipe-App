import "./App.css";
import NavBar from "./components/navbar";
import AppRouter from "./Router/routing";

function App() {
  return (
    <div className="bg-orange-950/6 min-h-screen">
      <NavBar />
      <AppRouter />
    </div>
  );
}

export default App;
