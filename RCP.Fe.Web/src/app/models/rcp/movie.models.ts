import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingPhimByRoom extends IBaseRequestPaging {
    idCinema: number
    idRoom: number
}

export interface IAddPhim{
    idCinema?: number
    idRoom?: number
    idPhim?: number
    thoiGianBatDauChieu?: string
    thoiGianKetThucChieu?: string
}

export interface IUpdatePhimByRoom{
    id?: number
    idCinema?: number
    idRoom?: number
    idPhim?: number
    thoiGianBatDauChieu?: Date
    thoiGianKetThucChieu?: Date
}

export type IViewPhimByRoom = {
    idCinema?: number;
    idRoom?: number;
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