import { useState } from "react";

export default function MovieCard({ movie, onClick }) {
  const [hovered, setHovered] = useState(false);
  const fallbackImage = "https://placehold.co/300x450/1a1a1a/FFD700?text=KachiFlix";

  return (
    <div
      onClick={() => onClick(movie.imdbID)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        borderRadius: "14px",
        overflow: "hidden",
        background: "linear-gradient(160deg, #1a1a1a, #111)",
        border: hovered ? "2px solid #FFD700" : "2px solid #2a2a2a",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered ? "0 20px 50px rgba(255,215,0,0.25)" : "0 4px 20px rgba(0,0,0,0.5)",
        position: "relative",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "2/3", overflow: "hidden" }}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : fallbackImage}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
          alt={movie.Title}
          style={{ 
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            filter: hovered ? "brightness(0.7)" : "brightness(0.9)",
            transition: "filter 0.3s ease" 
          }}
        />
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.4)"
          }}>
            <div style={{
              background: "rgba(255,215,0,0.95)", borderRadius: "50%", width: "56px", height: "56px",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px"
            }}>▶</div>
          </div>
        )}
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(255,215,0,0.95)", color: "#000", fontWeight: 900,
          fontSize: "11px", padding: "4px 8px", borderRadius: "20px", letterSpacing: "0.5px"
        }}>
          {movie.Type?.toUpperCase() || "MOVIE"}
        </div>
      </div>
      <div style={{ padding: "14px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: "14px", lineHeight: 1.3,
          fontFamily: "'Georgia', serif", marginBottom: "4px",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {movie.Title}
        </div>
        <div style={{ color: "#888", fontSize: "12px", fontWeight: 600 }}>{movie.Year}</div>
      </div>
    </div>
  );
}