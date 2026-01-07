export interface CreatePaymentRequest {
  amount: number;
  description: string;
  sessionId: string;
}

export interface PaymentUrlResponse {
  paymentUrl?: string;
  transactionId?: string;
}
