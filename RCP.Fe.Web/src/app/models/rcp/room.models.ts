import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingRoom extends IBaseRequestPaging {
    idCinema: number;
}

export interface ICreateRoom{
    idCinema ?: number,
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    soLuongGheVip?: number,
    soLuongGheDoi?: number,
}

export interface IUpdateRoom{
    id?: number,
    idCinema ?: number,
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    soLuongGheVip?: number,
    soLuongGheDoi?: number,
}

export type IViewRoom = { 
    id?: number,
    
    name?: string,
    description?: string,
    location?: string,
    tongSoLuongGhe? : number,
    soLuongGheThuong?: number,
    soLuongGheVip?: number,
    soLuongGheDoi?: number,
}