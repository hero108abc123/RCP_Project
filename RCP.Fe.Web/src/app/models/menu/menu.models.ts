import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IAddMonVaoMenu {
    idThucDon: number;
    idMon: number;
    gia: number;
}

export interface ICreateMenu {
    idCinema: number;
    tenThucDon: string;
    moTa: string;
    tongSoMon: number;
}

export interface IFindPagingMenu extends IBaseRequestPaging {
}

export interface IFindPagingMonByIdThucDon extends IBaseRequestPaging {
    idThucDon: number;
}

export interface IUpdateMenu {
    id: number;
    idCinema: number;
    tenThucDon: string;
    moTa: string;
    tongSoMon: number;
}

export interface IUpdateMonVao {
    id: number;
    idThucDon: number;
    idMon: number;
    gia: number;
}

export type IViewMenu = {
    id?: number;
    cinema?: ICinemaMenu;
    tenThucDon?: string;
    tongSoMon?: number;
}
export interface IMenuPagingResponse {
    items: IViewMenu[];
    totalItems: number;
}

export type IViewMonByIdThucDon = {
    id?: number
    mon?: IViewMon;
    soLuong?: number;
    trangThai?: number;
    gia?: number;
}

export type IViewMon = {
    id?: number;
    idHang?: number;
    name?: string;
    moTa?: string;
    soLuong?: number;
    anhMinhHoa?: string;
    loai?: number;
}
export interface IMonByThucDonPagingResponse {
    items: IViewMonByIdThucDon[];
    totalItems: number;
    customData?: any;
}

export type ICinemaMenu ={
    id?: number
    name?: string
}
export type IGetMenuById ={ 
    id: number;
    idCinema: number;
    tenThucDon: string;
    moTa: string;
    tongSoMon: number;
}
export interface IGetByIdMonVaoMenu {
    id: number;
    idThucDon: number;
    idMon: number;
    gia: number;
}