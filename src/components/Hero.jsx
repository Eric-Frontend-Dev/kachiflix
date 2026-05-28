export default function Hero({ hero, heroIndex, heroMovies, setHeroIndex, onViewDetails, onFindSimilar }) {
  const fallbackImage = "https://placehold.co/280x420/1a1a1a/FFD700?text=KachiFlix";
  
  if (!hero) return null;
  
  return (
    <div className="hero-container" style={{ position: "relative", minHeight: "520px", overflow: "hidden", background: "#0a0a0a", display: "flex", alignItems: "center", padding: "80px 5% 40px", gap: "40px", flexWrap: "wrap" }}>
      
      {/* Text Section */}
      <div className="hero-text" style={{ position: "relative", zIndex: 2, flex: "1 1 300px", display: "flex", flexDirection: "column", maxWidth: "500px" }}>
        <div style={{ color: "#FFD700", fontSize: "11px", fontWeight: 800, letterSpacing: "3px", marginBottom: "12px" }}>
          🎬 NOW TRENDING
        </div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, fontFamily: "'Georgia', serif", lineHeight: 1.1, margin: "0 0 16px 0" }}>
          {hero.Title}
        </h1>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
          <span style={{ background: "#FFD700", color: "#000", fontWeight: 900, padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
            ★ {hero.imdbRating}
          </span>
          <span style={{ color: "#888", fontSize: "13px" }}>{hero.Year} • {hero.Runtime}</span>
          <span style={{ color: "#888", fontSize: "13px" }}>{hero.Genre?.split(",")[0]}</span>
        </div>
        <p style={{ color: "#aaa", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "400px" }}>
          {hero.Plot?.length > 150 ? hero.Plot.slice(0, 150) + "…" : hero.Plot}
        </p>
        <div className="hero-buttons" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={onViewDetails} style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)", color: "#000", border: "none", padding: "12px 28px", borderRadius: "50px", fontWeight: 900, fontSize: "14px", cursor: "pointer", animation: "pulse 2s infinite" }}>
            ▶ View Details
          </button>
          <button onClick={onFindSimilar} style={{ background: "transparent", color: "#fff", border: "2px solid #333", padding: "12px 24px", borderRadius: "50px", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
            Find Similar
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div style={{ flex: "0 1 280px", display: "flex", justifyContent: "center" }}>
        <img
          className="hero-img"
          key={heroIndex}
          src={hero.Poster !== "N/A" ? hero.Poster : fallbackImage}
          onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
          alt={hero.Title}
          style={{
            height: "420px", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
            border: "3px solid #FFD700", animation: "fadeIn 0.6s ease",
            objectFit: "cover", width: "100%", maxWidth: "280px"
          }}
        />
      </div>

      {/* hero dots */}
      <div className="hero-dots" style={{ position: "absolute", bottom: "20px", left: "5%", display: "flex", gap: "8px", zIndex: 2 }}>
        {heroMovies.map((_, i) => (
          <div key={i} onClick={() => setHeroIndex(i)} style={{
            width: i === heroIndex ? "28px" : "8px", height: "8px", borderRadius: "4px",
            background: i === heroIndex ? "#FFD700" : "#333", cursor: "pointer",
            transition: "all 0.3s ease"
          }} />
        ))}
      </div>
    </div>
  );
}