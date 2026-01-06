export interface IRoom {
  id?: number;
  name: string;
  description?: string;
  location?: string;
  tongSoLuongGhe?: number;
  soLuongGheThuong?: number;
  soLuongGheDoi?: number;
  soLuongGheThuongMoiHang?: number;
  soLuongGheDoiMoiHang?: number;
}

export interface IFindRoomParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  // Các trường khác nếu FindPagingDto có (ví dụ city, district...)
  idCinema: number;
}

// 2. Định nghĩa Interface cho Response Paging (tương ứng BaseResponsePagingDto bên C#)
export interface IPagingResponse<T> {
  items: T[];
  totalItems: number;
}
