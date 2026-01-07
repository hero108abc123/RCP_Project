import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IMovie,
  IFindMovieParams,
  IPagingResponse,
} from "@/model/movie/movie.models";
import { getAllMovie } from "@/api/movie.service";

// --- 1. Async Thunk ---
export const $getAllMovies = createAsyncThunk(
  "movie/getAll",
  async (params: IFindMovieParams, { rejectWithValue }) => {
    try {
      const res = await getAllMovie(params);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// --- 2. State Definition ---
type MovieState = {
  items: IMovie[];
  totalItems: number;
  $getAllMovies: {
    loading: boolean;
    error?: any;
  };
  // Bạn có thể thêm state cho phim đang chọn nếu cần (ví dụ để xem chi tiết)
  selectedMovie?: IMovie;
};

const initialState: MovieState = {
  items: [],
  totalItems: 0,
  $getAllMovies: {
    loading: false,
  },
};

// --- 3. Slice Definition ---
const movieSlice = createSlice({
  name: "movie",
  initialState,

  // Selectors
  selectors: {
    selectMovies: (state) => state.items,

    selectMoviePagination: (state) => ({
      total: state.totalItems,
      count: state.items.length,
    }),

    // Trạng thái loading
    isLoadingMovies: (state) => state.$getAllMovies.loading,

    // Selector lấy phim theo ID từ list (hữu ích cho việc cache client)
    selectMovieById: (state, id: number) =>
      state.items.find((m) => m.id === id),
  },

  reducers: {
    // Reset danh sách phim
    clearMovies(state) {
      state.items = [];
      state.totalItems = 0;
      state.$getAllMovies = { loading: false };
    },
    // Lưu phim đang chọn vào state
    setSelectedMovie(state, action: PayloadAction<IMovie | undefined>) {
      state.selectedMovie = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Pending
      .addCase($getAllMovies.pending, (state) => {
        state.$getAllMovies.loading = true;
        state.$getAllMovies.error = undefined;
      })
      // Fulfilled
      .addCase(
        $getAllMovies.fulfilled,
        (state, action: PayloadAction<IPagingResponse<IMovie>>) => {
          state.$getAllMovies.loading = false;
          state.items = action.payload.items;
          state.totalItems = action.payload.totalItems;
        }
      )
      // Rejected
      .addCase($getAllMovies.rejected, (state, action) => {
        state.$getAllMovies.loading = false;
        state.$getAllMovies.error = action.payload;
      });
  },
});

// Export Actions
export const { clearMovies, setSelectedMovie } = movieSlice.actions;

// Export Selectors
export const {
  selectMovies,
  selectMoviePagination,
  isLoadingMovies,
  selectMovieById,
} = movieSlice.selectors;

// Export Reducer
export default movieSlice.reducer;
