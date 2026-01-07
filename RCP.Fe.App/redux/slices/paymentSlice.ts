import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Thay đường dẫn này bằng đường dẫn thực tế tới file service bạn vừa tạo
import { createPaymentUrl } from "@/api/payment.service";
import {
  CreatePaymentRequest,
  PaymentUrlResponse,
} from "@/model/payment/payment.models";

// 1. Định nghĩa State
interface PaymentState {
  paymentUrl: string | null; // Link thanh toán trả về từ VNPay
  transactionId: string | null; // Mã giao dịch
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean; // Cờ đánh dấu đã tạo link thành công
}

const initialState: PaymentState = {
  paymentUrl: null,
  transactionId: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// 2. Định nghĩa Async Thunk
export const createPaymentUrlThunk = createAsyncThunk<
  PaymentUrlResponse, // Kiểu dữ liệu trả về khi thành công
  CreatePaymentRequest, // Kiểu dữ liệu đầu vào
  { rejectValue: string } // Kiểu dữ liệu trả về khi lỗi
>("payment/createPaymentUrl", async (payload, { rejectWithValue }) => {
  try {
    const response = await createPaymentUrl(payload);
    return response;
  } catch (err: any) {
    // Message lỗi đã được xử lý console/toast bên service,
    // ở đây chỉ return string để lưu vào store
    return rejectWithValue(err?.message || "Không thể tạo liên kết thanh toán");
  }
});

// 3. Tạo Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // Action để reset trạng thái (ví dụ khi người dùng hủy thanh toán hoặc thoát màn hình)
    resetPaymentState: (state) => {
      state.paymentUrl = null;
      state.transactionId = null;
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Xử lý createPaymentUrlThunk ---
      .addCase(createPaymentUrlThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
        state.paymentUrl = null;
      })
      .addCase(createPaymentUrlThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentUrl = action.payload.paymentUrl || null;
        state.transactionId = action.payload.transactionId || null;
      })
      .addCase(createPaymentUrlThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Lỗi không xác định";
        state.isSuccess = false;
      });
  },
});

// Export Actions và Reducer
export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
