import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface ICreateKho {
    idCinema: number;
    tenKho: string;
}

export interface ICreateNhapHang {
    idKho: number;
    idMatHang: number;
    soLuongNhap: number;
    donGiaNhap: number;
}

export interface IFindPagingByIdKho extends IBaseRequestPaging {
    idKho: number;
}

export interface IFindPagingKho extends IBaseRequestPaging {
    //idCinema: number;
}

export interface IUpdateKho {
    id?: number;
    idCinema: number;
    tenKho: string;
}

export type IViewKhoByIdCinema = {
    id?: number;
    idCinema?: number;
    tenKho?: string;
}

export type IViewKho = {
    //id?: number;
    hangs?: IViewMatHang[];
}

export type IViewMatHang = {
    id?: number;
    tenMon?: string;
    moTa?: string;
    soLuongNhap?: number;
    soLuongDaBan?: number;
    soLuongTonKho?: number;
}

export type IViewKhoPaging = {
    id?: number;
    tenKho?: string;
    cinema?: ICinema;
}

export type ICinema = {
    id?: number;
    name?: string;
}

export interface IUpdateNhapHang{
    id:number
    idKho: number;
    idMatHang: number;
    soLuongNhap: number;
    donGiaNhap: number;
}
export interface IGetMatHangTrongKhoById{
    id:number
    idKho: number;
    idMatHang: number;
    soLuongNhap: number;
    donGiaNhap: number;
}