import { useState } from "react";
import axios from "axios";
import type { PlanId, RegisterPayload, RegisterResponse } from "../types";

interface Props {
  selectedPlan: PlanId | null;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "#141414",
  border: "1px solid #2a2a2a",
  borderRadius: 8,
  color: "#f0f0f0",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.78rem",
  color: "#666",
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 1,
};

export default function RegistrationForm({ selectedPlan }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      setStatus("error");
      setMessage("Please select a plan first.");
      return;
    }

    setStatus("loading");
    try {
      const payload: RegisterPayload = { ...form, planId: selectedPlan };
      const { data } = await axios.post<RegisterResponse>(
        "/api/register",
        payload,
      );
      setStatus(data.success ? "success" : "error");
      setMessage(data.message);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: "3rem" }}>🎉</div>
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "2rem",
            color: "#e8ff00",
            marginTop: 12,
          }}
        >
          You're In!
        </h3>
        <p style={{ color: "#888", marginTop: 8 }}>{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <div>
        <label style={labelStyle}>Full Name</label>
        <input
          style={inputStyle}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input
          style={inputStyle}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div style={{ height: 1, background: "#1e1e1e", margin: "4px 0" }} />
      <p
        style={{
          color: "#555",
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Payment Details
      </p>

      <div>
        <label style={labelStyle}>Card Number</label>
        <input
          style={inputStyle}
          name="cardNumber"
          value={form.cardNumber}
          onChange={handleChange}
          placeholder="4242 4242 4242 4242"
          maxLength={19}
          required
        />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Expiry</label>
          <input
            style={inputStyle}
            name="expiry"
            value={form.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>CVV</label>
          <input
            style={inputStyle}
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={3}
            required
          />
        </div>
      </div>

      {status === "error" && (
        <div
          style={{
            background: "#2e1a1a",
            border: "1px solid #c0392b",
            borderRadius: 8,
            padding: "12px 16px",
            color: "#eb5757",
            fontSize: "0.9rem",
          }}
        >
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !selectedPlan}
        style={{
          padding: "16px",
          background: "#e8ff00",
          color: "#000",
          border: "none",
          borderRadius: 8,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "1.4rem",
          letterSpacing: 2,
          cursor:
            status === "loading" || !selectedPlan ? "not-allowed" : "pointer",
          opacity: status === "loading" || !selectedPlan ? 0.4 : 1,
          transition: "opacity 0.2s",
          marginTop: 4,
        }}
      >
        {status === "loading" ? "Processing..." : "Complete Registration"}
      </button>
    </form>
  );
}
