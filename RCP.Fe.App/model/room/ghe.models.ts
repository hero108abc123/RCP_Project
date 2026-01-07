export interface IGheInRoom {
  id?: number;
  name?: string;
  hang?: string;
  hangGhe?: number;
  giave?: IGiaVeCuaGhe;
}

export interface IGiaVeCuaGhe {
  id?: number;
  giaVe?: string;
}

export interface IFindGheParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  // Các trường khác nếu FindPagingDto có (ví dụ city, district...)
  idCinema: number;
  idRoom: number;
}

// 2. Định nghĩa Interface cho Response Paging (tương ứng BaseResponsePagingDto bên C#)
export interface IPagingResponse<T> {
  items: T[];
  totalItems: number;
}
