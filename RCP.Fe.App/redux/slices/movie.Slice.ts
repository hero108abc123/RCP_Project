// store/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllMovie } from '@/api/movie.service';
import { IMovie, IFindMovieParams, IPagingResponse } from '@/model/movie/movie.models';

interface MovieState {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  totalItems: 0,
  pageNumber: 1,
  pageSize: 10,
};

// Async thunk để gọi API
export const fetchMovies = createAsyncThunk<
  IPagingResponse<IMovie>, // Return type
  IFindMovieParams | undefined, // Params type
  { rejectValue: string }
>('movies/fetchMovies', async (params, thunkAPI) => {
  try {
    const res = await getAllMovie(params ?? { pageNumber: 1, pageSize: 10 });
    return {
      items: res.items ?? [],
      totalItems: res.totalItems ?? 0,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message ?? 'Lỗi khi lấy danh sách phim');
  }
});

const movieSlice = createSlice({
  name: 'movies',
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
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload ?? 'Lỗi khi lấy dữ liệu';
      });
  },
});

export const { setPage, setPageSize, resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
