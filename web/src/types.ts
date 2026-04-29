export type PlanId = "basic" | "pro" | "elite";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  features: string[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  planId: PlanId;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  memberId?: string;
}
