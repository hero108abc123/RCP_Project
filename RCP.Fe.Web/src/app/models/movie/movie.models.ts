import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IGetDropDownPhim {
    id: number;
    tenPhim: string;
}

export interface IGetDropDownTheLoai{
    id?: number
    tenTheLoai?: string
}

export interface IFindPagingPhim extends IBaseRequestPaging{
    idTheLoai?: number[];
    dangChieu?: number;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string[];
    daoDien?: string;
    dienVien?: string;
    tuNgay?: string;
    denNgay?: string;
}

export interface ICreatePhim {
    tenPhim?: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    anhBia?: File;
    trailerUrl?: string;
    thoiLuongPhut?: number;
    ngayKhoiChieu?: Date;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
    theLoaiIds?: number[];
}

export interface IUpdatePhim{
    id?: number;
    tenPhim?: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    anhBia?: File;
    trailerUrl?: string;
    thoiLuongPhut?: number;
    ngayKhoiChieu?: Date;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
    theLoaiIds?: number[];
}

export type IViewPhim = {
    id?: number;
    tenPhim?: string;
    moTa?: string;
    daoDien?: string;
    dienVien?: string;
    anhBia?: string;
    trailerUrl?: string;
    thoiLuongPhut?: number;
    ngayKhoiChieu?: Date;
    ngonNgu?: string;
    phanLoaiDoTuoi?: string;
    dangChieu?: number;
    theLoais? : ITheLoai[]
}
export type ITheLoai ={
    id: number;
    tenTheLoai: string;
}



