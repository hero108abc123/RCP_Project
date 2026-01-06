export interface IMovie {
  id?: number;
  tenPhim?: string;
  moTa?: string;
  daoDien?: string;
  dienVien?: string;
  trailerUrl?: string;
  thoiLuongPhut?: number;
  anhBia?: string;
  ngayKhoiChieu?: Date;
  ngonNgu?: string;
  phanLoaiDoTuoi?: string;
  dangChieu?: number;
  theLoais?: IViewTheLoai[];
}

export interface IViewTheLoai {
  id?: number;
  tenTheLoai?: string;
}
// 1. Định nghĩa Interface cho Params (tương ứng FindPagingDto bên C#)
export interface IFindMovieParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  // Các trường khác nếu FindPagingDto có (ví dụ city, district...)
}

// 2. Định nghĩa Interface cho Response Paging (tương ứng BaseResponsePagingDto bên C#)
export interface IPagingResponse<T> {
  items: T[];
  totalItems: number;
}
