export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid #1a1a1a", padding: "30px 5%",
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px",
    }}>
      <span style={{
        fontFamily: "'Georgia', serif", fontWeight: 900, fontSize: "18px",
        background: "linear-gradient(135deg, #FFD700, #FFA500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        KachiFlix
      </span>
      <span style={{ color: "#333", fontSize: "12px" }}>
        Built by Kachiikwu Eric Adura • Powered by OMDb API
      </span>
    </footer>
  );
}