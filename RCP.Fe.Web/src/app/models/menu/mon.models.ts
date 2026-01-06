import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface ICreateMon {
    idHang: number;
    name: string;
    moTa: string;
    soLuong: number;
    anhMinhHoa?: File;
    loai: number;
}

export interface IUpdateMon {
    id: number;
    idHang: number;
    name: string;
    moTa: string;
    soLuong: number;
    anhMinhHoa?: File;
    loai: number;
}

export interface IFindPagingMon extends IBaseRequestPaging {
}

export interface IViewByIdMon {
    id: number;
    idHang: number;
    name: string;
    moTa: string;
    soLuong: number;
    anhMinhHoa?: string;
    loai: number;
}

export interface IViewDropDownMon {
    id: number;
    tenMon: string;
}

export type IViewMon = {
    //hang?: IHang;
    id?: number;
    moTa?: string;
    name?: string;
    soLuong?: number;
    anhMinhHoa?: string;
    loai?: number;
}

export type IHang = {
    id: number;
    tenMon: string;
    moTa: string;
}