import { useState } from "react";
import PlanCard from "./components/Plancard";
import RegistrationForm from "./components/Registrationform";
import type { Plan, PlanId } from "./types";

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 19.99,
    features: ["Gym access (weekdays)", "Locker room", "2 group classes/month"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 39.99,
    features: [
      "24/7 gym access",
      "Unlimited classes",
      "Personal trainer (1/month)",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: 69.99,
    features: ["All Pro features", "Nutrition coaching", "Spa & recovery zone"],
  },
];

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "64px 20px 40px",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            color: "#e8ff00",
            letterSpacing: 4,
            lineHeight: 1,
          }}
        >
          FitChain 2025
        </h1>
        <p style={{ color: "#555", marginTop: 12, fontSize: "1.05rem" }}>
          New Year. New You. Lock in your rate before it's gone.
        </p>
      </header>

      {/* Plans */}
      <section style={{ padding: "52px 20px 40px" }}>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.6rem",
            letterSpacing: 3,
            color: "#444",
            marginBottom: 32,
          }}
        >
          CHOOSE YOUR PLAN
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedPlan}
              onSelect={setSelectedPlan}
            />
          ))}
        </div>
      </section>

      {/* Selected Plan Banner */}
      {selectedPlan && (
        <div
          style={{
            textAlign: "center",
            margin: "0 auto 8px",
            color: "#888",
            fontSize: "0.9rem",
          }}
        >
          Selected:{" "}
          <span style={{ color: "#e8ff00", fontWeight: 600 }}>
            {PLANS.find((p) => p.id === selectedPlan)?.name} — $
            {PLANS.find((p) => p.id === selectedPlan)?.price}/mo
          </span>
        </div>
      )}

      {/* Registration Form */}
      <section
        style={{ maxWidth: 460, margin: "0 auto", padding: "32px 20px 80px" }}
      >
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            letterSpacing: 2,
            marginBottom: 24,
          }}
        >
          Register Now
        </h2>
        <RegistrationForm selectedPlan={selectedPlan} />
      </section>
    </div>
  );
}
