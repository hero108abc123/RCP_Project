import { ICreateHang, IFindPagingHang, IUpdateHang, IViewHang } from "@/models/kho/hang.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HangService{
    api = '/api/app/hang';
    http = inject(HttpClient);

    create(body: ICreateHang){
        return this.http.post<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    update (body:IUpdateHang){
        return this.http.put<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    delete (id:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
    findPaging(query: IFindPagingHang){
            const params : any ={
                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                keyword: query.keyword || ''
            };
             return this.http.get<IBaseResponseWithData<any>> (`${this.api}`, {params});
    }
    getById(id:number){
            return this.http.get<IBaseResponseWithData<IViewHang>> (`${this.api}/${id}`);
    }
    getDropDown(){
            return this.http.get<IBaseResponseWithData<IViewHang[]>>(`${this.api}/drop-down`);
    }
}