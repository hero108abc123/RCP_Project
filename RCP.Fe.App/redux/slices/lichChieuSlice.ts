import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCinemas } from "@/api/lichchieu.service";
import {
  ILichChieu,
  IFindLichChieuParams,
  IPagingResponse,
} from "@/model/cinema/lichchieu.models";

interface LichChieuState {
  lichChieu: ILichChieu[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: LichChieuState = {
  lichChieu: [],
  loading: false,
  error: null,
  totalItems: 0,
  pageNumber: 1,
  pageSize: 10,
};

// Async thunk để gọi API
export const fetchLichChieu = createAsyncThunk<
  IPagingResponse<ILichChieu>, // Return type
  IFindLichChieuParams | undefined, // Params type
  { rejectValue: string }
>("lichChieu/fetchLichChieu", async (params, thunkAPI) => {
  try {
    const res = await getAllCinemas(params ?? { pageNumber: 1, pageSize: 10 });
    return {
      items: res.items ?? [],
      totalItems: res.totalItems ?? 0,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Lỗi khi lấy danh sách lịch chiếu"
    );
  }
});

const lichChieuSlice = createSlice({
  name: "lichChieu",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetLichChieu: (state) => {
      state.lichChieu = [];
      state.totalItems = 0;
      state.pageNumber = 1;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLichChieu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLichChieu.fulfilled, (state, action) => {
        state.loading = false;
        state.lichChieu = action.payload.items;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchLichChieu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi khi lấy dữ liệu";
      });
  },
});

export const { setPage, setPageSize, resetLichChieu } = lichChieuSlice.actions;
export default lichChieuSlice.reducer;
