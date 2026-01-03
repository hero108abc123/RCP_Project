import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models"

export interface IFindPagingLichChieu extends IBaseRequestPaging {
    idCinema?: number
    idRoom?: number
    idTheLoai?: number
    tuNgay?: string
    denNgay?: string
}

export interface IAddPhim{
    idCinema?: number
    idRoom?: number
    idPhim?: number
    thoiGianBatDauChieu?: string
    thoiGianKetThucChieu?: string
}

export interface IUpdateLichChieu{
    id?: number
    idCinema?: number
    idRoom?: number
    idPhim?: number
    thoiGianBatDauChieu?: string
    thoiGianKetThucChieu?: string
}

export type IViewLichChieu = {
    cinema?:IViewCinema;
    room?: IViewRoom;
    movies?: IViewPhimCinema[];
    
}

export type IViewPhimCinema = {
    idCinemaRoomMovie?: number;
    idPhim: number;
    tenPhim: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    thoiLuongPhut: number;
    ngayKhoiChieu: string;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
    dangChieu: boolean;
    anhCinema: IViewPhimAnhCinema[];
    thoiGianBatDauChieu?: string
    thoiGianKetThucChieu?: string
}

export type IViewCinema = {
    id: number,
    name: string,
}

export type IViewRoom = {
    id: number,
    name: string,
}


export type IViewPhimAnhCinema = {
    id: number;
    idPhim: number;
    url: string;
    loaiAnh?: string;
    laAnhChinh: boolean;
}

export interface IDeletePhimByRoom{
    idCinema: number
    idRoom: number
    idPhim: number
}

export interface IGetById{
    cinema?:IViewCinema;
    room?: IViewRoom;
    phim?: IGetPhim;
}

export interface IGetPhim{
    id: number
    tenPhim: string;
}