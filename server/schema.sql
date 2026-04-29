-- Run this once against your RDS PostgreSQL instance

CREATE TABLE IF NOT EXISTS members (
  id          UUID PRIMARY KEY,
  name        VARCHAR(255)        NOT NULL,
  email       VARCHAR(255)        NOT NULL UNIQUE,
  plan_id     VARCHAR(20)         NOT NULL CHECK (plan_id IN ('basic', 'pro', 'elite')),
  payment_ref VARCHAR(50)         NOT NULL,
  amount      NUMERIC(10, 2)      NOT NULL,
  created_at  TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);