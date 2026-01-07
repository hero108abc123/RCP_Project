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
    console.log("🔍 [$getTrangThaiGhe] Request:", dto);
    try {
      const result = await getTrangThaiGhe(dto);
      console.log("✅ [$getTrangThaiGhe] Success:", result);
      return result;
    } catch (error) {
      console.error("❌ [$getTrangThaiGhe] Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const $datVeTam = createAsyncThunk(
  "datVe/datVeTam",
  async (dto: DatVeTamDto, { rejectWithValue }) => {
    console.log("🔍 [$datVeTam] Request:", dto);
    try {
      const result = await datVeTam(dto);
      console.log("✅ [$datVeTam] Success:", result);
      return result;
    } catch (error) {
      console.error("❌ [$datVeTam] Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const $huyDatVeTam = createAsyncThunk(
  "datVe/huyDatVeTam",
  async (idGheTamGiu: number, { rejectWithValue }) => {
    console.log("🔍 [$huyDatVeTam] IdGheTamGiu:", idGheTamGiu);
    try {
      await huyDatVeTam(idGheTamGiu);
      console.log("✅ [$huyDatVeTam] Success");
      return idGheTamGiu;
    } catch (error) {
      console.error("❌ [$huyDatVeTam] Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const $huyDatVeTamBySession = createAsyncThunk(
  "datVe/huyDatVeTamBySession",
  async (sessionId: string, { rejectWithValue }) => {
    console.log("🔍 [$huyDatVeTamBySession] SessionId:", sessionId);
    try {
      await huyDatVeTamBySession(sessionId);
      console.log("✅ [$huyDatVeTamBySession] Success");
      return sessionId;
    } catch (error) {
      console.error("❌ [$huyDatVeTamBySession] Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const $xacNhanDatVeUser = createAsyncThunk(
  "datVe/xacNhanUser",
  async (dto: XacNhanDatVeByUserIdDto, { rejectWithValue }) => {
    console.log("🔍 [$xacNhanDatVeUser] Request:", dto);
    try {
      const result = await xacNhanDatVeByUserId(dto);
      console.log("✅ [$xacNhanDatVeUser] Success:", result);
      return result;
    } catch (error) {
      console.error("❌ [$xacNhanDatVeUser] Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const $getChiTietVe = createAsyncThunk(
  "datVe/getChiTietVe",
  async (idVe: number, { rejectWithValue }) => {
    console.log("🔍 [$getChiTietVe] IdVe:", idVe);
    try {
      const result = await getVeById(idVe);
      console.log("✅ [$getChiTietVe] Success:", result);
      return result;
    } catch (error) {
      console.error("❌ [$getChiTietVe] Error:", error);
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
  timeLeft: 600,
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
        console.log("⏱️ [tick] TimeLeft:", state.timeLeft);
      }
    },
    setTimeLeft(state, action: PayloadAction<number>) {
      console.log("⏱️ [setTimeLeft] New value:", action.payload);
      state.timeLeft = action.payload;
    },
    resetDatVe(state) {
      console.log("🔄 [resetDatVe] Resetting state");
      state.gheDangGiu = null;
      state.veHienTai = null;
      state.timeLeft = 600;
      state.listGheTrangThai = [];
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase($getTrangThaiGhe.fulfilled, (state, action) => {
        console.log("🔧 [Reducer] getTrangThaiGhe.fulfilled:", action.payload);
        state.listGheTrangThai = action.payload;
      })

      .addCase($datVeTam.pending, (state) => {
        console.log("🔧 [Reducer] datVeTam.pending");
        state.loading = true;
      })
      .addCase($datVeTam.fulfilled, (state, action: PayloadAction<IGheTam>) => {
        console.log("🔧 [Reducer] datVeTam.fulfilled:", action.payload);
        state.loading = false;
        state.gheDangGiu = action.payload;
      })
      .addCase($datVeTam.rejected, (state, action) => {
        console.error("🔧 [Reducer] datVeTam.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($huyDatVeTam.pending, (state) => {
        console.log("🔧 [Reducer] huyDatVeTam.pending");
        state.loading = true;
      })
      .addCase($huyDatVeTam.fulfilled, (state) => {
        console.log("🔧 [Reducer] huyDatVeTam.fulfilled");
        state.loading = false;
      })
      .addCase($huyDatVeTam.rejected, (state, action) => {
        console.error("🔧 [Reducer] huyDatVeTam.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($huyDatVeTamBySession.fulfilled, (state) => {
        console.log("🔧 [Reducer] huyDatVeTamBySession.fulfilled");
        state.gheDangGiu = null;
      })

      .addCase($xacNhanDatVeUser.pending, (state) => {
        console.log("🔧 [Reducer] xacNhanDatVeUser.pending");
        state.loading = true;
      })
      .addCase($xacNhanDatVeUser.fulfilled, (state) => {
        console.log("🔧 [Reducer] xacNhanDatVeUser.fulfilled");
        state.loading = false;
      })
      .addCase($xacNhanDatVeUser.rejected, (state, action) => {
        console.error("🔧 [Reducer] xacNhanDatVeUser.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      .addCase($getChiTietVe.fulfilled, (state, action: PayloadAction<IVe>) => {
        console.log("🔧 [Reducer] getChiTietVe.fulfilled:", action.payload);
        state.veHienTai = action.payload;
      });
  },
});

export const { tick, setTimeLeft, resetDatVe } = datVeSlice.actions;

export default datVeSlice.reducer;