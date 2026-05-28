import MovieCard from "./MovieCard";

export default function MovieGrid({ loading, error, movies, query, searched, heroMovies, onCardClick }) {
  return (
    <div style={{ padding: "40px 5%", maxWidth: "1300px", margin: "0 auto" }}>
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{
            display: "inline-block", width: "48px", height: "48px",
            border: "4px solid #1e1e1e", borderTop: "4px solid #FFD700",
            borderRadius: "50%", animation: "spin 0.8s linear infinite",
          }} />
          <p style={{ color: "#555", marginTop: "16px" }}>Finding movies for you...</p>
        </div>
      )}

      {error && !loading && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎬</div>
          <p style={{ color: "#888" }}>{error}</p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div id="movies">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>
              Results for <span style={{ color: "#FFD700" }}>"{query}"</span>
              <span style={{ color: "#555", fontWeight: 400, fontSize: "14px", marginLeft: "10px" }}>
                {movies.length} found
              </span>
            </h2>
          </div>
          <div className="grid-movie">
            {movies.map((m) => (
              <MovieCard key={m.imdbID} movie={m} onClick={onCardClick} />
            ))}
          </div>
        </div>
      )}

      {!loading && !searched && heroMovies.length > 0 && (
        <div id="trending" style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px" }}>
            🔥 <span style={{ color: "#FFD700" }}>Popular</span> Right Now
          </h2>
          <div className="grid-movie">
            {heroMovies.map((m) => (
              <MovieCard key={m.imdbID} movie={m} onClick={onCardClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}