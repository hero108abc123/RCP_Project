// redux/slices/datVeSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IVe,
  DatVeTamDto,
  XacNhanDatVeByUserIdDto,
} from "@/model/datve/ve.models";
import { IGheTam, GetTrangThaiGheDto } from "@/model/datve/ghetam.models";
import {
  getTrangThaiGhe,
  datVeTam,
  huyDatVeTam,
  huyDatVeTamBySession,
  xacNhanDatVeByUserId,
  getVeById,
} from "@/api/datve.service";

// --- Async Thunks ---

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

export const $huyDatVeTam = createAsyncThunk(
  "datVe/huyDatVeTam",
  async (idGheTamGiu: number, { rejectWithValue }) => {
    try {
      await huyDatVeTam(idGheTamGiu);
      return idGheTamGiu;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const $huyDatVeTamBySession = createAsyncThunk(
  "datVe/huyDatVeTamBySession",
  async (sessionId: string, { rejectWithValue }) => {
    try {
      await huyDatVeTamBySession(sessionId);
      return sessionId;
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

// --- State ---

export type DatVeState = {
  listGheTrangThai: any[];
  gheDangGiu: IGheTam | null;
  veHienTai: IVe | null;
  timeLeft: number;
  loading: boolean;
  error?: any;
};

const initialState: DatVeState = {
  listGheTrangThai: [],
  gheDangGiu: null,
  veHienTai: null,
  timeLeft: 600, // Mặc định 10 phút
  loading: false,
};

// --- Slice ---

const datVeSlice = createSlice({
  name: "datVe",
  initialState,
  reducers: {
    tick(state) {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    setTimeLeft(state, action: PayloadAction<number>) {
      state.timeLeft = action.payload;
    },
    resetDatVe(state) {
      state.gheDangGiu = null;
      state.veHienTai = null;
      state.timeLeft = 600; // Reset về 10 phút
      state.listGheTrangThai = [];
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase($getTrangThaiGhe.fulfilled, (state, action) => {
        state.listGheTrangThai = action.payload;
      })

      .addCase($datVeTam.pending, (state) => {
        state.loading = true;
      })
      .addCase($datVeTam.fulfilled, (state, action: PayloadAction<IGheTam>) => {
        state.loading = false;
        state.gheDangGiu = action.payload;
        // Không set timeLeft từ API, giữ nguyên countdown từ FE
      })
      .addCase($datVeTam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($huyDatVeTam.pending, (state) => {
        state.loading = true;
      })
      .addCase($huyDatVeTam.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase($huyDatVeTam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($huyDatVeTamBySession.fulfilled, (state) => {
        state.gheDangGiu = null;
        // Không reset timeLeft, để component tự xử lý
      })

      .addCase($xacNhanDatVeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase($xacNhanDatVeUser.fulfilled, (state) => {
        state.loading = false;
        // Không reset timeLeft, để component tự xử lý
      })
      .addCase($xacNhanDatVeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($getChiTietVe.fulfilled, (state, action: PayloadAction<IVe>) => {
        state.veHienTai = action.payload;
      });
  },
});

export const { tick, setTimeLeft, resetDatVe } = datVeSlice.actions;

export default datVeSlice.reducer;