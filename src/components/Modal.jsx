import StarRating from "./StarRating";

export default function Modal({ movie, onClose }) {
  const fallbackImage = "https://placehold.co/260x390/1a1a1a/FFD700?text=No+Poster";
  
  if (!movie) return null;
  const trailerQuery = encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`);
  const trailerUrl = `https://www.youtube.com/results?search_query=${trailerQuery}`;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
        borderRadius: "20px", maxWidth: "820px", width: "100%", overflow: "hidden",
        border: "2px solid #FFD700", boxShadow: "0 30px 80px rgba(255,215,0,0.2)",
        maxHeight: "90vh", overflowY: "auto", animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)"
      }}>
        <div className="modal-inner" style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {/* Poster */}
          <div className="modal-poster" style={{ flex: "0 0 260px", minWidth: "200px" }}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : fallbackImage}
              onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
              alt={movie.Title}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "360px" }}
            />
          </div>
          {/* Info */}
          <div style={{ flex: 1, padding: "32px 28px", minWidth: "240px" }}>
            <button onClick={onClose} style={{
              float: "right", background: "none", border: "2px solid #333", color: "#888",
              width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer",
              fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center"
            }}>✕</button>
            <div style={{ color: "#FFD700", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", marginBottom: "8px", textTransform: "uppercase" }}>
              {movie.Genre}
            </div>
            <h2 style={{ color: "#fff", fontSize: "26px", fontWeight: 900, fontFamily: "'Georgia', serif",
              margin: "0 0 6px 0", lineHeight: 1.2 }}>{movie.Title}</h2>
            <div style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </div>
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div style={{ marginBottom: "16px" }}>
                <StarRating rating={movie.imdbRating} />
                <div style={{ color: "#555", fontSize: "12px", marginTop: "4px" }}>
                  {movie.imdbVotes} votes on IMDb
                </div>
              </div>
            )}
            <p style={{ color: "#ccc", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
              {movie.Plot}
            </p>
            <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: "16px", marginBottom: "20px" }}>
              {[["Director", movie.Director], ["Cast", movie.Actors], ["Language", movie.Language], ["Country", movie.Country]].map(([label, val]) =>
                val && val !== "N/A" ? (
                  <div key={label} style={{ display: "flex", gap: "8px", marginBottom: "8px", fontSize: "13px" }}>
                    <span style={{ color: "#FFD700", fontWeight: 700, minWidth: "75px" }}>{label}:</span>
                    <span style={{ color: "#bbb" }}>{val}</span>
                  </div>
                ) : null
              )}
            </div>
            <a href={trailerUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "linear-gradient(135deg, #FFD700, #FFA500)",
              color: "#000", fontWeight: 900, padding: "12px 24px", borderRadius: "50px",
              textDecoration: "none", fontSize: "14px", letterSpacing: "0.5px",
              boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
              transition: "transform 0.2s ease"
            }}>
              ▶ Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}