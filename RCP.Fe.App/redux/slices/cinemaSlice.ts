import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICinema,
  IFindCinemaParams,
  IPagingResponse,
} from "@/model/cinema/cinema.models";
// Giả sử file service bạn lưu tên là cinema.service.ts
import { getAllCinemas } from "@/api/cinema.service";

// 1. Async Thunk (Tương tự $login)
export const $getAllCinemas = createAsyncThunk(
  "cinema/getAll",
  async (params: IFindCinemaParams, { rejectWithValue }) => {
    try {
      const res = await getAllCinemas(params);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 2. State Definition
type CinemaState = {
  items: ICinema[]; // Danh sách rạp
  totalItems: number; // Tổng số lượng bản ghi (để phân trang)
  $getAllCinemas: {
    // Trạng thái call API (loading, error)
    loading?: boolean;
    error?: any;
  };
};

const initialState: CinemaState = {
  items: [],
  totalItems: 0,
  $getAllCinemas: {
    loading: false,
  },
};

// 3. Slice Definition
const cinemaSlice = createSlice({
  name: "cinema",
  initialState,

  // Selectors (Redux Toolkit v2+)
  selectors: {
    // Lấy toàn bộ danh sách rạp
    selectCinemas: (state) => state.items,

    // Lấy thông tin phân trang
    selectCinemaPagination: (state) => ({
      total: state.totalItems,
      count: state.items.length,
    }),

    // Lấy danh sách rạp format cho Dropdown (ví dụ: {label: name, value: id})
    selectCinemaOptions: (state) =>
      state.items.map((c) => ({
        label: c.name,
        value: c.id,
      })),

    // Check loading
    isLoadingCinemas: (state) => !!state.$getAllCinemas.loading,
  },

  reducers: {
    // Reset data rạp về rỗng (nếu cần)
    clearCinemas(state) {
      state.items = [];
      state.totalItems = 0;
      state.$getAllCinemas = { loading: false };
    },
    // Nếu muốn update 1 rạp cụ thể trong list client-side (ví dụ sau khi edit)
    updateCinemaInList(state, action: PayloadAction<ICinema>) {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase($getAllCinemas.pending, (state) => {
        state.$getAllCinemas.loading = true;
        state.$getAllCinemas.error = undefined;
      })
      // Fulfilled
      .addCase(
        $getAllCinemas.fulfilled,
        (state, action: PayloadAction<IPagingResponse<ICinema>>) => {
          state.$getAllCinemas.loading = false;
          state.items = action.payload.items; // Map items từ API vào state
          state.totalItems = action.payload.totalItems; // Map totalItems
        }
      )
      // Rejected
      .addCase($getAllCinemas.rejected, (state, action) => {
        state.$getAllCinemas.loading = false;
        state.$getAllCinemas.error = action.payload;
      });
  },
});

// Export Actions
export const { clearCinemas, updateCinemaInList } = cinemaSlice.actions;

// Export Selectors
export const {
  selectCinemas,
  selectCinemaPagination,
  selectCinemaOptions,
  isLoadingCinemas,
} = cinemaSlice.selectors;

// Export Reducer
export default cinemaSlice.reducer;
