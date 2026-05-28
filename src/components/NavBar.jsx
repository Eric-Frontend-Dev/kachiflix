import { useState, useEffect } from "react";

export default function Navbar({ goHome, goMovies, goTrending }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (action) => {
    action();
    setIsOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e1e1e", padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span 
            onClick={() => handleNavClick(goHome)} 
            style={{ cursor: "pointer", fontSize: "26px", fontWeight: 900, fontFamily: "'Georgia', serif",
            background: "linear-gradient(135deg, #FFD700, #FFA500)", WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", letterSpacing: "-0.5px" }}
          >
            Kachi<span style={{ WebkitTextFillColor: "#fff" }}>Flix</span>
          </span>
          <span style={{ background: "#FFD700", color: "#000", fontSize: "9px", fontWeight: 900,
            padding: "2px 6px", borderRadius: "4px", letterSpacing: "1px" }}>BETA</span>
        </div>

        {/* IF DESKTOP: Show text links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "24px" }}>
            <span onClick={() => handleNavClick(goHome)} className="nav-link" style={{ color: "#888", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}>Home</span>
            <span onClick={() => handleNavClick(goMovies)} className="nav-link" style={{ color: "#888", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}>Movies</span>
            <span onClick={() => handleNavClick(goTrending)} className="nav-link" style={{ color: "#888", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "color 0.2s" }}>Trending</span>
          </div>
        )}

        {/* IF MOBILE: Show Hamburger Icon */}
        {isMobile && (
          <div 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ cursor: "pointer", fontSize: "28px", color: "#FFD700", padding: "5px", userSelect: "none" }}
          >
            {isOpen ? "✕" : "☰"}
          </div>
        )}
      </nav>

      {/* IF MOBILE AND MENU IS OPEN: Show dropdown overlay */}
      {isMobile && isOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0, bottom: 0,
          background: "rgba(10,10,10,0.98)", zIndex: 99,
          display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "60px", gap: "30px",
          animation: "fadeIn 0.2s ease"
        }}>
          <span onClick={() => handleNavClick(goHome)} style={{ color: "#fff", fontSize: "24px", fontWeight: 700, cursor: "pointer" }}>Home</span>
          <span onClick={() => handleNavClick(goMovies)} style={{ color: "#fff", fontSize: "24px", fontWeight: 700, cursor: "pointer" }}>Movies</span>
          <span onClick={() => handleNavClick(goTrending)} style={{ color: "#fff", fontSize: "24px", fontWeight: 700, cursor: "pointer" }}>Trending</span>
        </div>
      )}
    </>
  );
}