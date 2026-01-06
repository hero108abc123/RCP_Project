import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingThongKeKho extends IBaseRequestPaging{
    idCinema?: number
    idKho?: number
    idMatHang?: number
    ngayNhap?: string
}

export type IViewThongKeKho = { 
    cinema?: ICinemaKho
    id?: number
    kho?: IKho
    matHang?: IMatHang
    soLuongNhap?: number
    donGiaNhap?: number
    tongGiaTriNhapHang?: number
    ngayNhap?: string
}

export type ICinemaKho = {
    id?: number
    name?: string
}

export type IKho = {
    id?: number
    tenKho?: string
}

export type IMatHang = {
    id?: number
    tenMon?: string
}