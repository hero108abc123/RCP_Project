// src/models/Movie.js
export default class Movie {
  constructor({
    id,
    tenPhim,
    theLoai,
    status,
    moTa,
    daoDien,
    dienVien,
    thoiLuongPhut,
    ngayKhoiChieu,
    ngonNgu,
    phanLoaiDoTuoi,
    trailerFile,
    anhBia
  }) {
    this.id = id;
    this.tenPhim = tenPhim;
    this.theLoai = theLoai || [];
    this.status = status;
    this.moTa = moTa;
    this.daoDien = daoDien;
    this.dienVien = dienVien;
    this.thoiLuongPhut = thoiLuongPhut;
    this.ngayKhoiChieu = ngayKhoiChieu;
    this.ngonNgu = ngonNgu;
    this.phanLoaiDoTuoi = phanLoaiDoTuoi;
    this.trailerFile = trailerFile;
    this.anhBia = anhBia;
  }
}
