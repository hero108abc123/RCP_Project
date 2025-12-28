import { IBaseRequestPaging } from "@/shared/models/request-paging.base.models";

export interface IFindPagingRCP extends IBaseRequestPaging {}

export interface ICreateRCP {
    name?: string;
    location?: string;
    city?: string;
    district?: string;
    soLuongPhongChieu?: number;
    fileAnhCinema?: File;
}


export interface IUpdateRCP {
    id: number;
    name?: string;
    location?: string;
    city?: string;
    district?: string;
    soLuongPhongChieu?: number;
    fileAnhCinema?: File;
}

export interface IViewRCP {
    id?: number;
    name?: string;
    location?: string;
    city?: string;
    district?: string;
    soLuongPhongChieu?: number;
    urlAnhCinema?: string;
}