export interface IVe {
  id?: number;
  sessionId?: number;
  tongTien: string;
  cinema?: ICinemaVe;
  room?: IRoomVe;
  phim?: IPhimVe;
  lichChieu?: ILichChieuVe;
  ghe?: IGheVe;
}

export interface ICinemaVe {
  id?: number;
  name?: string;
  location?: string;
  district?: string;
  city?: string;
}

export interface IRoomVe {
  id?: number;
  name?: string;
}

export interface IPhimVe {
  id?: number;
  tenPhim?: string;
  thoiLuongPhut?: number;
  phanLoaiDoTuoi?: string;
}

export interface ILichChieuVe {
  id?: number;
  thoiGianBatDauChieu?: Date;
  thoiGianKetThucChieu?: Date;
}

export interface IGheVe {
  id?: number;
  tenGhe?: string;
  hang?: string;
  hangGhe?: number;
  gia?: string;
}

export interface IHuyVe {
  sessionId?: string;
}

export interface DatVeTamDto {
  idCinema?: number;
  idPhim?: number;
  idRoom?: number;
  idSuatChieu?: number;
  idGhe?: number[];
  sessionId?: string;
}

export interface XacNhanDatVeByUserInfor {
  idGheTamGiu?: number[];
  sessionId?: string;
  hoVaTen?: string;
  soDienThoai?: string;
  email?: string;
  diaChi?: string;
  birthDay?: Date;
}

export interface XacNhanDatVeByUserIdDto {
  idGheTamGiu?: number[];
  sessionId?: string;
}
