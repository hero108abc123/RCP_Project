// store/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllMovie, getMovieById } from "@/api/movie.service";
import {
  IMovie,
  IFindMovieParams,
  IPagingResponse,
} from "@/model/movie/movie.models";

interface MovieState {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  // ✅ THÊM state cho chi tiết phim
  movieDetail: IMovie | null;
  loadingDetail: boolean;
  errorDetail: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalItems: 0,
  pageNumber: 1,
  pageSize: 10,
  // ✅ THÊM initial state
  movieDetail: null,
  loadingDetail: false,
  errorDetail: null,
};

// Async thunk để gọi API
export const fetchMovies = createAsyncThunk<
  IPagingResponse<IMovie>, // Return type
  IFindMovieParams | undefined, // Params type
  { rejectValue: string }
>("movies/fetchMovies", async (params, thunkAPI) => {
  try {
    const res = await getAllMovie(params ?? { pageNumber: 1, pageSize: 10 });
    return {
      items: res.items ?? [],
      totalItems: res.totalItems ?? 0,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Lỗi khi lấy danh sách phim"
    );
  }
});

export const fetchMovieDetail = createAsyncThunk<
  IMovie | null,
  number,
  { rejectValue: string }
>("movies/fetchMovieDetail", async (id, thunkAPI) => {
  try {
    const res = await getMovieById(id);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err?.message ?? "Lỗi khi lấy chi tiết phim"
    );
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    resetMovies: (state) => {
      state.movies = [];
      state.totalItems = 0;
      state.pageNumber = 1;
      state.error = null;
      state.loading = false;
    },
    // ✅ THÊM action reset movieDetail
    resetMovieDetail: (state) => {
      state.movieDetail = null;
      state.loadingDetail = false;
      state.errorDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.items;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Lỗi khi lấy dữ liệu";
      })
      // ✅ THÊM xử lý fetchMovieDetail
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload ?? "Lỗi khi lấy chi tiết phim";
      });
  },
});

export const { setPage, setPageSize, resetMovies, resetMovieDetail } = movieSlice.actions;
export default movieSlice.reducer;