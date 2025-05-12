import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.imdbID);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(movie.imdbID);
        else addToFavorites(movie);
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                    alt={movie.Title}
                />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <p>{movie.Title}</p>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

export default MovieCard;
