export interface ILichChieu {
  cinema: ICinemaLichChieu;
  room: IRoomLichChieu;
  movies: IMovieLichChieu[];
}

export interface ICinemaLichChieu {
  idCinema?: number;
  name?: string;
}

export interface IRoomLichChieu {
  idRoom?: number;
  name?: string;
}

export interface IMovieLichChieu {
  idPhim?: number;
  tenPhim?: string;
  moTa?: string;
  daoDien?: string;
  dienVien?: string;
  thoiLuongPhut?: number;
  ngayKhoiChieu?: Date;
  ngonNgu?: string;
  phanLoaiDoTuoi?: string;
  dangChieu?: number;
  anhCinema?: IAnhCinema[];
  thoiGianBatDauChieu?: Date;
  thoiGianKetThucChieu?: Date;
}

export interface IAnhCinema {
  id?: number;
  idPhim?: number;
  url?: string;
  loaiAnh?: string;
  laAnhChinh?: number;
}

export interface IFindLichChieuParams {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  // Các trường khác nếu FindPagingDto có (ví dụ city, district...)
  idCinema?: number[];
  idRoom?: number[];
  idTheLoai?: number[];
  tuNgay?: Date;
  denNgay?: Date;
}

export interface IPagingResponse<T> {
  items: T[];
  totalItems: number;
}
