import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ILichChieu,
  IFindLichChieuParams,
  IPagingResponse,
} from "@/model/cinema/lichchieu.models";
import { getAllCinemas } from "@/api/lichchieu.service"; // Lưu ý: Tên hàm trong file service của bạn đang là getAllCinemas cho lịch chiếu

// --- 1. Async Thunk ---
export const $getAllLichChieu = createAsyncThunk(
  "lichChieu/getAll",
  async (params: IFindLichChieuParams, { rejectWithValue }) => {
    try {
      const res = await getAllCinemas(params);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// --- 2. State Definition ---
type LichChieuState = {
  items: ILichChieu[];
  totalItems: number;
  $getAllLichChieu: {
    loading: boolean;
    error?: any;
  };
  // Lưu trữ bộ lọc hiện tại để dùng cho việc refresh hoặc phân trang
  filter: IFindLichChieuParams;
};

const initialState: LichChieuState = {
  items: [],
  totalItems: 0,
  $getAllLichChieu: {
    loading: false,
  },
  filter: {
    pageNumber: 1,
    pageSize: 10,
  },
};

// --- 3. Slice Definition ---
const lichChieuSlice = createSlice({
  name: "lichChieu",
  initialState,

  // Selectors
  selectors: {
    selectLichChieus: (state) => state.items,

    selectLichChieuPagination: (state) => ({
      total: state.totalItems,
      count: state.items.length,
    }),

    isLoadingLichChieu: (state) => state.$getAllLichChieu.loading,

    // Selector hỗ trợ lấy lịch chiếu theo Cinema cụ thể
    selectLichChieuByCinemaId: (state, cinemaId: number) =>
      state.items.filter((item) => item.cinema.idCinema === cinemaId),
  },

  reducers: {
    // Cập nhật bộ lọc (ví dụ khi người dùng chọn ngày hoặc chọn rạp khác)
    setFilter(state, action: PayloadAction<IFindLichChieuParams>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    // Reset dữ liệu
    clearLichChieu(state) {
      state.items = [];
      state.totalItems = 0;
      state.$getAllLichChieu = { loading: false };
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase($getAllLichChieu.pending, (state) => {
        state.$getAllLichChieu.loading = true;
        state.$getAllLichChieu.error = undefined;
      })
      // Fulfilled
      .addCase(
        $getAllLichChieu.fulfilled,
        (state, action: PayloadAction<IPagingResponse<ILichChieu>>) => {
          state.$getAllLichChieu.loading = false;
          state.items = action.payload.items;
          state.totalItems = action.payload.totalItems;
        }
      )
      // Rejected
      .addCase($getAllLichChieu.rejected, (state, action) => {
        state.$getAllLichChieu.loading = false;
        state.$getAllLichChieu.error = action.payload;
      });
  },
});

// Export Actions
export const { setFilter, clearLichChieu } = lichChieuSlice.actions;

// Export Selectors
export const {
  selectLichChieus,
  selectLichChieuPagination,
  isLoadingLichChieu,
  selectLichChieuByCinemaId,
} = lichChieuSlice.selectors;

// Export Reducer
export default lichChieuSlice.reducer;
