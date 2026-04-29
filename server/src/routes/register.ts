import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db";

const router = Router();

const VALID_PLANS = ["basic", "pro", "elite"] as const;
type PlanId = (typeof VALID_PLANS)[number];

const PLAN_PRICES: Record<PlanId, number> = {
  basic: 19.99,
  pro: 39.99,
  elite: 69.99,
};

// POST /api/register
router.post("/", async (req: Request, res: Response) => {
  const { name, email, planId, cardNumber, expiry, cvv } = req.body;

  // --- Basic validation ---
  if (!name || !email || !planId || !cardNumber || !expiry || !cvv) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }
  if (!VALID_PLANS.includes(planId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid plan selected." });
  }

  const memberId = uuidv4();
  const amount = PLAN_PRICES[planId as PlanId];

  try {
    // --- Simulate payment processing ---
    // In production: call Stripe/Braintree here before inserting
    const paymentRef = `PAY-${uuidv4().slice(0, 8).toUpperCase()}`;

    // --- Insert member ---
    await pool.query(
      `INSERT INTO members (id, name, email, plan_id, payment_ref, amount)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [memberId, name, email, planId, paymentRef, amount],
    );

    return res.status(201).json({
      success: true,
      message: `Welcome to FitChain! Your ${planId} membership is active. Ref: ${paymentRef}`,
      memberId,
    });
  } catch (err: any) {
    // Duplicate email
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "This email is already registered." });
    }
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
});

// GET /api/register/:id  — fetch a member (optional, useful for testing)
router.get("/:id", async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    "SELECT id, name, email, plan_id, created_at FROM members WHERE id = $1",
    [req.params.id],
  );
  if (!rows.length)
    return res.status(404).json({ message: "Member not found." });
  return res.json(rows[0]);
});

export default router;
