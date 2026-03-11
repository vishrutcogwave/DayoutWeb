import { api } from "./axios";

interface PhonePePaymentResponse {
  redirectUrl: string;
  merchantOrderId: string;
}

interface PaymentStatusResponse {
  orderId: string;
  state: string;
  amount: number;
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

export const checkPaymentStatus = async (
  merchantOrderId: string
): Promise<PaymentStatusResponse> => {
  try {
    const response = await api.get<PaymentStatusResponse>(
      "/api/bookingengine/PGPaymentStatus",
      {
        params: {
          MerchantorderID: merchantOrderId,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Payment status check failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};



interface SubmitDayOutResponse {
  bookingid: string;
  status: string;
}

export const submitDayOutData = async (
  bookingPayload: any,
  paymentResponse: any
): Promise<SubmitDayOutResponse> => {
  try {
    const requestBody = {
      ...bookingPayload,
      paymentResponse: paymentResponse,
    };

    const response = await api.post<SubmitDayOutResponse>(
      "/api/bookingengine/submitdayoutdata",
      requestBody
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "❌ Submit booking failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};