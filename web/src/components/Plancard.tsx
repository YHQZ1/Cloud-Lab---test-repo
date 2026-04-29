import type { Plan, PlanId } from "../types";

interface Props {
  plan: Plan;
  selected: PlanId | null;
  onSelect: (id: PlanId) => void;
}

export default function PlanCard({ plan, selected, onSelect }: Props) {
  const isSelected = selected === plan.id;

  return (
    <div
      onClick={() => onSelect(plan.id)}
      style={{
        background: isSelected ? "#1a1a1a" : "#111",
        border: `2px solid ${isSelected ? "#e8ff00" : "#2a2a2a"}`,
        borderRadius: 12,
        padding: "28px 24px",
        cursor: "pointer",
        width: 260,
        transition: "all 0.2s",
        transform: isSelected ? "translateY(-6px)" : "none",
        boxShadow: isSelected ? "0 0 24px rgba(232,255,0,0.15)" : "none",
      }}
    >
      <h2
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "2rem",
          letterSpacing: 2,
          color: "#f0f0f0",
        }}
      >
        {plan.name}
      </h2>
      <div
        style={{
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "#e8ff00",
          margin: "10px 0 4px",
        }}
      >
        ${plan.price}
        <span style={{ fontSize: "1rem", color: "#666", fontWeight: 400 }}>
          {" "}
          / mo
        </span>
      </div>
      <ul style={{ listStyle: "none", marginTop: 16 }}>
        {plan.features.map((f) => (
          <li
            key={f}
            style={{ color: "#888", padding: "3px 0", fontSize: "0.88rem" }}
          >
            <span style={{ color: "#e8ff00" }}>✓ </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
