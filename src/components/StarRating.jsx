export default function StarRating({ rating }) {
  const stars = Math.round((parseFloat(rating) / 10) * 5);
  return (
    <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{ color: i <= stars ? "#FFD700" : "#444", fontSize: "14px" }}
        >
          ★
        </span>
      ))}
      <span
        style={{
          color: "#FFD700",
          fontSize: "13px",
          marginLeft: "4px",
          fontWeight: 700,
        }}
      >
        {rating}/10
      </span>
    </div>
  );
}