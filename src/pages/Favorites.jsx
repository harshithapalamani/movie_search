import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/movieCard";
function Favorites() {
    const { favorites } = useMovieContext();

    return (
        <div className="favorites-page">
            {favorites.length === 0 ? (
                <div className="favorites-empty">
                    <h2>No favorite movies yet</h2>
                    <p>Start adding your favorite movies, and they will appear here!</p>
                </div>
            ) : (
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
