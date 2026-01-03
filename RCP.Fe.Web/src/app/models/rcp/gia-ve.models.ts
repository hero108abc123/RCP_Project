import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingGiaVe extends IBaseRequestPaging{

}

export interface ICreateGiaVe {
    giaNgayThuong: string;
    giaNgayLe: string;
    giaCuoiTuan: string;
    hangGhe: number;
    trangThaiNgay: number;
}

export interface IUpdateGiaVe {
    id: number,
    giaNgayThuong: string;
    giaNgayLe: string;
    giaCuoiTuan: string;
    hangGhe: number;
    trangThaiNgay: number;
}

export type IViewGiaVe ={
    id?: number,
    giaNgayThuong?: string;
    giaNgayLe?: string;
    giaCuoiTuan?: string;
    hangGhe?: number;
    trangThaiNgay?: number;
}