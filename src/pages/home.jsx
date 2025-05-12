import MovieCard from "../components/movieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../../apis/freekeys";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load popular movies on initial render
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies || []);
            } catch (err) {
                console.error("Error loading popular movies:", err);
                setError("Failed to load movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    // Handle the search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError("Please enter a valid search term.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const searchResults = await searchMovies(searchQuery);
            if (searchResults && searchResults.length > 0) {
                setMovies(searchResults);
            } else {
                setMovies([]);
                setError("No movies found for your search.");
            }
        } catch (err) {
            console.error("Error searching for movies:", err);
            setError("Failed to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}

            {/* Loading Spinner */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                // Movies Grid
                <div className="movies-grid">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                movie={movie}
                                key={movie.imdbID || movie.Title}
                            />
                        ))
                    ) : (
                        <div className="no-results">No movies found.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
