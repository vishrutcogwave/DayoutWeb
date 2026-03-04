import { api } from "./axios";

interface PhonePePaymentResponse {
  redirectUrl: string;
  merchantOrderId: string;
}

export const createPhonePePayment = async (
  amount: number,
  redirectUrl: string
): Promise<PhonePePaymentResponse> => {
  try {
    // Convert rupees to paise
    const amountInPaise = Math.round(amount * 100);

    const response = await api.get<PhonePePaymentResponse>(
      "/api/bookingengine/PGCreatePayment",
      {
        params: {
          Amount: amountInPaise,
          RedirectURL: redirectUrl,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("❌ Payment creation failed:", error.response?.data || error.message);
    throw error;
  }
};

