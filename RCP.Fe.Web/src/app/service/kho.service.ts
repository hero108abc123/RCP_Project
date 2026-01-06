import { ICreateKho, ICreateNhapHang, IFindPagingByIdKho, IFindPagingKho, IGetMatHangTrongKhoById, IUpdateKho, IUpdateNhapHang, IViewKhoPaging } from "@/models/kho/kho.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class KhoService{
    api = '/api/app/kho';
    http = inject(HttpClient);

    create(body: ICreateKho){
        return this.http.post<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    update (body:IUpdateKho){
        return this.http.put<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    delete (id:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
    findPaging(query: IFindPagingKho){
            const params : any ={
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                keyword: query.keyword || ''
            };
             return this.http.get<IBaseResponseWithData<any>> (`${this.api}`, {params});
    }
    findPagingHangTrongKho(query: IFindPagingByIdKho){
            const params : any ={
                idKho: query.idKho,
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                keyword: query.keyword || ''
            };
             return this.http.get<IBaseResponseWithData<any>> (`${this.api}/hang-trong-kho`, {params});
    }
    getById(id:number){
        return this.http.get<IBaseResponseWithData<IViewKhoPaging>> (`${this.api}/${id}`);
    }
    nhapHang(body:ICreateNhapHang){
            return this.http.post<IBaseResponseWithData<any>> (`${this.api}/nhap-hang`, body);
    }
    updateNhapHang(body:IUpdateNhapHang){
            return this.http.put<IBaseResponseWithData<any>> (`${this.api}/nhap-hang`, body);
    }
    deleteHangKhoiKho (idKho:number, idHang:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/${idKho}/hang/${idHang}`);
    }
    getMatHangTrongKhoById(id:number){
        return this.http.get<IBaseResponseWithData<IGetMatHangTrongKhoById>> (`${this.api}/${id}/hang-trong-kho`);
    }
    getDropDown(idCinema: number){
         return this.http.get<IBaseResponseWithData<IViewKhoPaging[]>> (`${this.api}/cinema/${idCinema}/drop-down`);
    }
}