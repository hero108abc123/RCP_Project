export interface ICinema {
  id?: number;
  name?: string;
  location?: string;
  city?: string;
  district?: string;
  soLuongPhongChieu?: number;
  urlAnhCinema?: string;
}

// 1. Định nghĩa Interface cho Params (tương ứng FindPagingDto bên C#)
export interface IFindCinemaParams {
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
