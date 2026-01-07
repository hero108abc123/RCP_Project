import { processApiMsgError } from "@/libs/utils";
import {
  CreatePaymentRequest,
  PaymentUrlResponse,
} from "@/model/payment/payment.models";
import api from "@/utils/axios";

// --- API SERVICES ---

/**
 * Tạo URL thanh toán VNPay
 * Method: POST
 * Endpoint: api/app/vnpay/create-payment-url
 */
export const createPaymentUrl = async (
  dto: CreatePaymentRequest
): Promise<PaymentUrlResponse> => {
  try {
    const res = await api.post(`api/app/vnpay/create-payment-url`, dto, {
      baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    });
    return res.data;
  } catch (err) {
    processApiMsgError(err, "Lỗi khi tạo đường dẫn thanh toán");
    return Promise.reject(err);
  }
};
