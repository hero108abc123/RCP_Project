import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingRoom extends IBaseRequestPaging {
    idCinema: number;
}

export interface IFindPagingGhe extends IBaseRequestPaging{
    idCinema: number;
    idRoom: number;
}

export interface ICreateRoom{
    idCinema ?: number,
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    //soLuongGheVip?: number,
    soLuongGheDoi?: number,
    soLuongGheThuongMoiHang?: number,
    soLuongGheDoiMoiHang?: number,
}

export interface IUpdateRoom{
    id?: number,
    idCinema ?: number,
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    //soLuongGheVip?: number,
    soLuongGheDoi?: number,
    soLuongGheThuongMoiHang?: number,
    soLuongGheDoiMoiHang?: number,
}

export type IViewRoom = { 
    id?: number,
    
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    //soLuongGheVip?: number,
    soLuongGheDoi?: number,
    soLuongGheThuongMoiHang?: number,
    soLuongGheDoiMoiHang?: number,
}

export type IViewGhe ={ 
    id?: number
    name?: string
    hang?: string
    hangGhe?: number 
    giaVe: IViewGiaVeGhe
}

export type IViewGiaVeGhe ={
    id?: number
    giaVe?: string
}

export interface IGetDropDownRoom{
    id?: number
    name?: string
}

