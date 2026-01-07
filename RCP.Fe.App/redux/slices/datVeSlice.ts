import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVe,
  DatVeTamDto,
  XacNhanDatVeByUserIdDto,
  XacNhanDatVeByUserInfor,
} from "@/model/datve/ve.models";
import { IGheTam, GetTrangThaiGheDto } from "@/model/datve/ghetam.models";
import {
  getTrangThaiGhe,
  datVeTam,
  huyDatVeTam,
  huyDatVeTamBySession,
  xacNhanDatVeByUserId,
  xacNhanDatVeByUserInfor,
  getVeById,
} from "@/api/datve.service";

// --- 1. Async Thunks ---

export const $getTrangThaiGhe = createAsyncThunk(
  "datVe/getTrangThaiGhe",
  async (dto: GetTrangThaiGheDto, { rejectWithValue }) => {
    try {
      return await getTrangThaiGhe(dto);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const $datVeTam = createAsyncThunk(
  "datVe/datVeTam",
  async (dto: DatVeTamDto, { rejectWithValue }) => {
    try {
      return await datVeTam(dto);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const $xacNhanDatVeUser = createAsyncThunk(
  "datVe/xacNhanUser",
  async (dto: XacNhanDatVeByUserIdDto, { rejectWithValue }) => {
    try {
      return await xacNhanDatVeByUserId(dto);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const $getChiTietVe = createAsyncThunk(
  "datVe/getChiTietVe",
  async (idVe: number, { rejectWithValue }) => {
    try {
      return await getVeById(idVe);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// --- 2. State Definition ---

type DatVeState = {
  listGheTrangThai: any[]; // Trạng thái 0,1,2,3
  gheDangGiu: IGheTam | null; // Thông tin phản hồi từ API đặt vé tạm
  veHienTai: IVe | null; // Thông tin vé sau khi xác nhận
  timeLeft: number; // Đếm ngược giữ ghế (giây)
  loading: boolean;
  error?: any;
};

const initialState: DatVeState = {
  listGheTrangThai: [],
  gheDangGiu: null,
  veHienTai: null,
  timeLeft: 0,
  loading: false,
};

// --- 3. Slice Definition ---

const datVeSlice = createSlice({
  name: "datVe",
  initialState,
  selectors: {
    selectListGhe: (state) => state.listGheTrangThai,
    selectGheDangGiu: (state) => state.gheDangGiu,
    selectTimeLeft: (state) => state.timeLeft,
    selectVeHienTai: (state) => state.veHienTai,
    isProcessing: (state) => state.loading,
  },
  reducers: {
    // Cập nhật countdown mỗi giây từ UI
    tick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    // Xóa sạch dữ liệu khi kết thúc luồng hoặc hết hạn
    resetDatVe(state) {
      state.gheDangGiu = null;
      state.veHienTai = null;
      state.timeLeft = 0;
      state.listGheTrangThai = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Lấy trạng thái ghế ---
      .addCase($getTrangThaiGhe.fulfilled, (state, action) => {
        state.listGheTrangThai = action.payload;
      })

      // --- Giữ ghế tạm thời (DatVeTam) ---
      .addCase($datVeTam.pending, (state) => {
        state.loading = true;
      })
      .addCase($datVeTam.fulfilled, (state, action: PayloadAction<IGheTam>) => {
        state.loading = false;
        state.gheDangGiu = action.payload;
        // Cập nhật thời gian đếm ngược từ Server (thường là 600 giây)
        state.timeLeft = action.payload.soGiayConLai ?? 0;
      })
      .addCase($datVeTam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Xác nhận đặt vé ---
      .addCase($xacNhanDatVeUser.fulfilled, (state) => {
        state.loading = false;
        // Sau khi xác nhận, thường xóa thời gian giữ ghế vì đã tạo hóa đơn
        state.timeLeft = 0;
      })

      // --- Lấy chi tiết vé ---
      .addCase($getChiTietVe.fulfilled, (state, action: PayloadAction<IVe>) => {
        state.veHienTai = action.payload;
      });
  },
});

// Export Actions
export const { tick, resetDatVe } = datVeSlice.actions;

// Export Selectors
export const {
  selectListGhe,
  selectGheDangGiu,
  selectTimeLeft,
  selectVeHienTai,
  isProcessing,
} = datVeSlice.selectors;

export default datVeSlice.reducer;
