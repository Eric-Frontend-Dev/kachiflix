import { POPULAR_SEARCHES } from "../constants/api";

export default function SearchBar({ query, setQuery, onSearch, searched }) {
  return (
    <div className="search-bar-container" style={{ padding: "40px 5% 0", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", fontSize: "20px" }}>🔍</span>
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
          placeholder="Search for any movie..."
          style={{
            width: "100%", padding: "18px 120px 18px 54px",
            background: "#161616", border: "2px solid #2a2a2a",
            borderRadius: "50px", color: "#fff", fontSize: "16px",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
        <button onClick={() => onSearch(query)} style={{
          position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)",
          background: "linear-gradient(135deg, #FFD700, #FFA500)",
          color: "#000", border: "none", padding: "10px 24px",
          borderRadius: "50px", fontWeight: 900, fontSize: "14px", cursor: "pointer"
        }}>
          Search
        </button>
      </div>

      {/* Quick filters */}
      {!searched && (
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {POPULAR_SEARCHES.map((term) => (
            <button key={term} onClick={() => { setQuery(term); onSearch(term); }} style={{
              background: "#161616", border: "1px solid #2a2a2a", color: "#888",
              padding: "6px 14px", borderRadius: "20px", fontSize: "12px",
              cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
            }}>
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}