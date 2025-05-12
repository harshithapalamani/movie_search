import "./css/App.css";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

// components go to Movieprovider


function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
