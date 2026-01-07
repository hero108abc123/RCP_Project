import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMenu,
  IFindMenuParams,
  IPagingResponse,
} from "@/model/menu/menu.models";
import { getAllMenus } from "@/api/menu.service";

// --- 1. Async Thunk ---
export const $getAllMenus = createAsyncThunk(
  "menu/getAll",
  async (params: IFindMenuParams, { rejectWithValue }) => {
    try {
      const res = await getAllMenus(params);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// --- 2. State Definition ---
type MenuState = {
  items: IMenu[];
  totalItems: number;
  $getAllMenus: {
    loading: boolean;
    error?: any;
  };
};

const initialState: MenuState = {
  items: [],
  totalItems: 0,
  $getAllMenus: {
    loading: false,
  },
};

// --- 3. Slice Definition ---
const menuSlice = createSlice({
  name: "menu",
  initialState,

  // Selectors (Sử dụng chuẩn Redux Toolkit v2+)
  selectors: {
    // Lấy toàn bộ danh sách menu
    selectMenus: (state) => state.items,

    // Lấy thông tin phân trang
    selectMenuPagination: (state) => ({
      total: state.totalItems,
      count: state.items.length,
    }),

    // Kiểm tra trạng thái đang tải
    isLoadingMenus: (state) => state.$getAllMenus.loading,

    // Selector lấy danh sách theo cụm rạp cụ thể (nếu cần filter client-side)
    selectMenusByCinema: (state, cinemaId: number) =>
      state.items.filter((item) => item.cinema?.id === cinemaId),
  },

  reducers: {
    // Reset dữ liệu menu
    clearMenus(state) {
      state.items = [];
      state.totalItems = 0;
      state.$getAllMenus = { loading: false };
    },
    // Update nhanh một item trong list (ví dụ khi sửa tên thực đơn)
    updateMenuItem(state, action: PayloadAction<IMenu>) {
      const index = state.items.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase($getAllMenus.pending, (state) => {
        state.$getAllMenus.loading = true;
        state.$getAllMenus.error = undefined;
      })
      // Fulfilled
      .addCase(
        $getAllMenus.fulfilled,
        (state, action: PayloadAction<IPagingResponse<IMenu>>) => {
          state.$getAllMenus.loading = false;
          state.items = action.payload.items;
          state.totalItems = action.payload.totalItems;
        }
      )
      // Rejected
      .addCase($getAllMenus.rejected, (state, action) => {
        state.$getAllMenus.loading = false;
        state.$getAllMenus.error = action.payload;
      });
  },
});

// Export Actions
export const { clearMenus, updateMenuItem } = menuSlice.actions;

// Export Selectors
export const {
  selectMenus,
  selectMenuPagination,
  isLoadingMenus,
  selectMenusByCinema,
} = menuSlice.selectors;

// Export Reducer
export default menuSlice.reducer;
