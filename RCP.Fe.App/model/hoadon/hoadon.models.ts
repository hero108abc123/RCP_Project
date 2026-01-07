export interface UpdateHoaDonDto {
  id?: number;
  sessionId?: string;
  idMon?: number[];
}
export interface UpdateHoaDonResponse {
  tongTien: string;
}

export interface UpdateTrangThaiHoaDonDto {
  id?: number;
  sessionId?: string;
  trangThai?: number;
}
