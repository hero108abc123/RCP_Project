import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models"

export interface ICreateHang{
    tenMon?:string
    moTa?: string
}

export interface IUpdateHang{
    id?: number
    tenMon?:string
    moTa?: string

}

export interface IFindPagingHang extends IBaseRequestPaging {
    //idCinema: number;
}

export type IViewHang = {
    id?: number
    tenMon?:string
    moTa?: string
}