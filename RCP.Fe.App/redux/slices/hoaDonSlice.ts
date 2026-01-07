import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// Giả định đường dẫn file service bạn vừa viết là @/services/hoadon.service
import { updateHoaDon, updateTrangThaiHoaDon } from "@/api/hoadon.service";
import {
  UpdateHoaDonDto,
  UpdateHoaDonResponse,
  UpdateTrangThaiHoaDonDto,
} from "@/model/hoadon/hoadon.models";

// 1. Định nghĩa State
interface HoaDonState {
  isLoading: boolean;
  error: string | null;
  tongTien: string; // Lưu tổng tiền sau khi update món
  isUpdateSuccess: boolean; // Cờ báo hiệu update thành công (để hiện toast/notification)
}

const initialState: HoaDonState = {
  isLoading: false,
  error: null,
  tongTien: "0",
  isUpdateSuccess: false,
};

// 2. Định nghĩa Async Thunks

/**
 * Thunk gọi API update món ăn trong hóa đơn
 */
export const updateHoaDonThunk = createAsyncThunk<
  UpdateHoaDonResponse, // Return type
  UpdateHoaDonDto, // Agrument type
  { rejectValue: string }
>("hoaDon/updateHoaDon", async (dto, { rejectWithValue }) => {
  try {
    const data = await updateHoaDon(dto);
    return data;
  } catch (err: any) {
    // Message lỗi đã được xử lý ở service (processApiMsgError),
    // ở đây ta chỉ catch để lưu vào state nếu cần.
    return rejectWithValue(err?.message || "Lỗi cập nhật hóa đơn");
  }
});

/**
 * Thunk gọi API update trạng thái hóa đơn
 */
export const updateTrangThaiHoaDonThunk = createAsyncThunk<
  any,
  UpdateTrangThaiHoaDonDto,
  { rejectValue: string }
>("hoaDon/updateTrangThai", async (dto, { rejectWithValue }) => {
  try {
    const data = await updateTrangThaiHoaDon(dto);
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Lỗi cập nhật trạng thái");
  }
});

// 3. Tạo Slice
const hoaDonSlice = createSlice({
  name: "hoaDon",
  initialState,
  reducers: {
    // Action để reset trạng thái (ví dụ khi thoát màn hình)
    resetHoaDonState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isUpdateSuccess = false;
    },
    // Action set tổng tiền thủ công (nếu cần)
    setTongTien: (state, action: PayloadAction<string>) => {
      state.tongTien = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --- Xử lý updateHoaDonThunk ---
    builder
      .addCase(updateHoaDonThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isUpdateSuccess = false;
      })
      .addCase(updateHoaDonThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdateSuccess = true;
        // Cập nhật lại tổng tiền từ server trả về
        state.tongTien = action.payload.tongTien;
      })
      .addCase(updateHoaDonThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Có lỗi xảy ra";
        state.isUpdateSuccess = false;
      });

    // --- Xử lý updateTrangThaiHoaDonThunk ---
    builder
      .addCase(updateTrangThaiHoaDonThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTrangThaiHoaDonThunk.fulfilled, (state) => {
        state.isLoading = false;
        // Có thể thêm logic xử lý khi đổi trạng thái thành công
      })
      .addCase(updateTrangThaiHoaDonThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Lỗi cập nhật trạng thái";
      });
  },
});

export const { resetHoaDonState, setTongTien } = hoaDonSlice.actions;
export default hoaDonSlice.reducer;
