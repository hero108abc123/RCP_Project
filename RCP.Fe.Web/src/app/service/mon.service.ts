import { ICreateMon, IUpdateMon, IViewByIdMon, IFindPagingMon, IViewDropDownMon } from "@/models/menu/mon.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MonService {
    api = '/api/app/mon';
    http = inject(HttpClient);

    create(body: FormData) {
        return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, body);
    }

    update(body: FormData) {
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}`, body);
    }

    delete(id: number) {
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }

    getById(id: number) {
        return this.http.get<IBaseResponseWithData<IViewByIdMon>>(`${this.api}/${id}`);
    }

    findPaging(query: IFindPagingMon) {
        const params: any = {
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };
        return this.http.get<IBaseResponseWithData<any>>(`${this.api}`, { params });
    }

    getDropDown() {
        return this.http.get<IBaseResponseWithData<IViewDropDownMon[]>>(`${this.api}/drop-down`);
    }
}