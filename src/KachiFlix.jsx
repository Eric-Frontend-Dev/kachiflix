import { useState, useEffect, useCallback } from "react";
import { API_KEY, BASE_URL } from "./constants/api";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export default function KachiFlix() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heroMovies, setHeroMovies] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchMovies = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`);
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search || []);
      } else {
        setMovies([]);
        setError(data.Error || "No results found.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
    setLoading(false);
  }, []);

  const fetchMovieDetails = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      if (data.Response === "True") setSelectedMovie(data);
    } catch {}
  };

  useEffect(() => {
    const loadHero = async () => {
      const picks = ["Avengers", "Inception", "Black Panther"];
      try {
        const results = await Promise.all(picks.map(async (term) => {
          const r = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${term}&type=movie`);
          const d = await r.json();
          if (d.Response === "True" && d.Search?.[0]) {
            const det = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${d.Search[0].imdbID}&plot=short`);
            const full = await det.json();
            return full.Response === "True" ? full : null;
          }
          return null;
        }));
        setHeroMovies(results.filter(Boolean));
      } catch (e) {
        console.error("Failed to load hero movies", e);
      }
    };
    loadHero();
  }, []);

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const interval = setInterval(() => setHeroIndex((i) => (i + 1) % heroMovies.length), 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const hero = heroMovies[heroIndex];

  const handleGoHome = () => {
    setQuery("");
    setMovies([]);
    setError("");
    setSearched(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoMovies = () => {
    fetchMovies("Action");
    setTimeout(() => {
      document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleGoTrending = () => {
    fetchMovies("2024");
    setTimeout(() => {
      document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div id="home" style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Trebuchet MS', 'Lucida Grande', sans-serif" }}>
      
            <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,0.4) } 50% { box-shadow: 0 0 0 8px rgba(255,215,0,0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px } ::-webkit-scrollbar-track { background: #111 }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 3px }
        input::placeholder { color: #555 }
        .search-input:focus { outline: none; border-color: #FFD700 !important; box-shadow: 0 0 0 3px rgba(255,215,0,0.15) }
        .nav-link:hover { color: #FFD700 !important }
        
        /* GRID */
        .grid-movie { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
        
        /* RESPONSIVE MEDIA QUERIES (For Hero & Modal only) */
        @media (max-width: 768px) {
          .hero-container { flex-direction: column-reverse !important; min-height: auto !important; padding-top: 40px !important; padding-bottom: 60px !important; text-align: center; }
          .hero-text { max-width: 100% !important; padding: 0 !important; align-items: center !important; }
          .hero-img { width: 60% !important; max-width: 220px !important; height: auto !important; position: relative !important; top: auto !important; right: auto !important; transform: none !important; margin: 0 auto; }
          .hero-buttons { justify-content: center !important; }
          .hero-dots { left: 50% !important; transform: translateX(-50%) !important; }
          
          .modal-inner { flex-direction: column !important; }
          .modal-poster { flex: none !important; width: 100% !important; max-width: 250px !important; margin: 0 auto; min-width: 0 !important; }
          .modal-poster img { min-height: 0 !important; height: auto !important; }
        }
        @media (max-width: 480px) {
          .grid-movie { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .search-input { font-size: 14px !important; padding-right: 90px !important; }
        }
      `}</style>
      <NavBar goHome={handleGoHome} goMovies={handleGoMovies} goTrending={handleGoTrending} />
      
      {hero && !searched && (
        <Hero
          hero={hero}
          heroIndex={heroIndex}
          heroMovies={heroMovies}
          setHeroIndex={setHeroIndex}
          onViewDetails={() => fetchMovieDetails(hero.imdbID)}
          onFindSimilar={() => { setQuery(hero.Title); fetchMovies(hero.Title); }}
        />
      )}

      <SearchBar query={query} setQuery={setQuery} onSearch={fetchMovies} searched={searched} />

      <MovieGrid
        loading={loading}
        error={error}
        movies={movies}
        query={query}
        searched={searched}
        heroMovies={heroMovies}
        onCardClick={fetchMovieDetails}
      />

      <Footer />

      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  );
}