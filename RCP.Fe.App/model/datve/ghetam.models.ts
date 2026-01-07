export interface IGheTam {
  id?: number;
  idGhe?: number;
  tenGhe?: string;
  gia?: string;
  ngauGioHetHan?: Date;
  soGiayConLai?: number;
}

export interface GetTrangThaiGheDto {
  idCinema?: number;
  idRoom?: number;
  idSuatChieu?: number;
  sessionId?: string;
}
