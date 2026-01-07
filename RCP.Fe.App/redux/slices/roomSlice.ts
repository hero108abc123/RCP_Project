import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IFindRoomParams,
  IRoom,
  IPagingResponse,
} from "@/model/room/room.models";
import { IFindGheParams, IGheInRoom } from "@/model/room/ghe.models";
import { getAllRoom, getAllGheInRoom } from "@/api/room.service";

// --- 1. Async Thunks ---

// Lấy danh sách phòng
export const $getAllRooms = createAsyncThunk(
  "room/getAllRooms",
  async (params: IFindRoomParams, { rejectWithValue }) => {
    try {
      return await getAllRoom(params);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Lấy danh sách ghế trong phòng
export const $getAllGheInRoom = createAsyncThunk(
  "room/getAllGheInRoom",
  async (params: IFindGheParams, { rejectWithValue }) => {
    try {
      return await getAllGheInRoom(params);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// --- 2. State Definition ---

type RoomState = {
  // Data Rooms
  rooms: IRoom[];
  totalRooms: number;

  // Data Ghế
  ghes: IGheInRoom[];
  totalGhes: number;

  // Trạng thái API
  $getAllRooms: {
    loading: boolean;
    error?: any;
  };
  $getAllGheInRoom: {
    loading: boolean;
    error?: any;
  };
};

const initialState: RoomState = {
  rooms: [],
  totalRooms: 0,
  ghes: [],
  totalGhes: 0,
  $getAllRooms: { loading: false },
  $getAllGheInRoom: { loading: false },
};

// --- 3. Slice Definition ---

// --- 3. Slice Definition ---

const roomSlice = createSlice({
  name: "room",
  initialState,

  selectors: {
    selectRooms: (state) => state.rooms,
    selectGhes: (state) => state.ghes,

    isLoadingRooms: (state) => state.$getAllRooms.loading,
    isLoadingGhes: (state) => state.$getAllGheInRoom.loading,

    selectRoomOptions: (state) =>
      state.rooms.map((r) => ({
        label: r.name,
        value: r.id,
      })),

    selectRoomPagination: (state) => ({
      total: state.totalRooms,
      count: state.rooms.length,
    }),
  },

  reducers: {
    clearRoomData(state) {
      state.rooms = [];
      state.totalRooms = 0;
      state.$getAllRooms = { loading: false };
    },
    clearGheData(state) {
      state.ghes = [];
      state.totalGhes = 0;
      state.$getAllGheInRoom = { loading: false };
    },
  },

  extraReducers: (builder) => {
    builder
      // --- Xử lý Get All Rooms ---
      .addCase($getAllRooms.pending, (state) => {
        state.$getAllRooms.loading = true;
        state.$getAllRooms.error = undefined;
      })
      .addCase(
        $getAllRooms.fulfilled,
        (state, action: PayloadAction<IPagingResponse<IRoom>>) => {
          state.$getAllRooms.loading = false;
          // Đảm bảo items luôn là mảng để không lỗi hàm .map() hoặc .reduce() ở UI
          state.rooms = action.payload?.items ?? [];
          state.totalRooms = action.payload?.totalItems ?? 0;
        }
      )
      .addCase($getAllRooms.rejected, (state, action) => {
        state.$getAllRooms.loading = false;
        state.$getAllRooms.error = action.payload;
      })

      // --- Xử lý Get All Ghế In Room ---
      .addCase($getAllGheInRoom.pending, (state) => {
        state.$getAllGheInRoom.loading = true;
        state.$getAllGheInRoom.error = undefined;
      })
      .addCase(
        $getAllGheInRoom.fulfilled,
        (state, action: PayloadAction<IPagingResponse<IGheInRoom>>) => {
          state.$getAllGheInRoom.loading = false;
          // Gán mảng ghế từ service đã được bóc tách lớp .data
          state.ghes = action.payload?.items ?? [];
          state.totalGhes = action.payload?.totalItems ?? 0;
        }
      )
      .addCase($getAllGheInRoom.rejected, (state, action) => {
        state.$getAllGheInRoom.loading = false;
        state.$getAllGheInRoom.error = action.payload;
      });
  },
});

// --- 4. Export ---

export const { clearRoomData, clearGheData } = roomSlice.actions;

export const {
  selectRooms,
  selectGhes,
  isLoadingRooms,
  isLoadingGhes,
  selectRoomOptions,
  selectRoomPagination,
} = roomSlice.selectors;

export default roomSlice.reducer;
