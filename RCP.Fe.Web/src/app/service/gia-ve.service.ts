import { ICreateGiaVe, IFindPagingGiaVe, IUpdateGiaVe } from "@/models/rcp/gia-ve.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GiaVeService{
    api = '/api/app/gia-ve';
    http = inject(HttpClient);

    create (body: ICreateGiaVe){
            return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, body);
    }
    update (body: IUpdateGiaVe){
            return this.http.put<IBaseResponseWithData<any>>(`${this.api}`,body);
    }
    
    delete (id: number){
            return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`)
    }
    findPaging (query: IFindPagingGiaVe){
            const params ={ 

                pageNumber: query.pageNumber,
                pageSize: query.pageSize,
                keyword: query.keyword || ''
            };
            return this.http.get<IBaseResponseWithData<any>> (`${this.api}`, {params});
    }
    
    findById ( id: number){
             return this.http.get<IBaseResponseWithData<any>>(`${this.api}/${id}`)
    }
}
