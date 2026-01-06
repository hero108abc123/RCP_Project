import { IAddMonVaoMenu, ICreateMenu, IFindPagingMenu, IFindPagingMonByIdThucDon, IGetByIdMonVaoMenu, IGetMenuById, IMenuPagingResponse, IMonByThucDonPagingResponse, IUpdateMenu, IUpdateMonVao, IViewMenu, IViewMonByIdThucDon } from "@/models/menu/menu.models";
import { IGetById } from "@/models/rcp/lich-chieu.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MenuService{
    api = '/api/app/menu';
    http = inject(HttpClient);

    create(body: ICreateMenu){
        return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, body);
    }

    update(body: IUpdateMenu){
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}`, body);
    }

    delete(id: number){
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }

    findPaging(query: IFindPagingMenu){
        const params: any = {
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || ''
        };
        return this.http.get<IBaseResponseWithData<IMenuPagingResponse>>(`${this.api}`, {params});
    }

    addMonVaoMenu(body: IAddMonVaoMenu){
        return this.http.post<IBaseResponseWithData<any>>(`${this.api}/add-mon`, body);
    }

    updateMonVaoMenu(body: IUpdateMonVao){
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}/update-mon`, body);
    }

    deleteMonKhoiMenu(id: number){
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/delete-mon/${id}`);
    }

    findPagingMonByThucDon(query: IFindPagingMonByIdThucDon){
        const params: any = {
            pageNumber: query.pageNumber,
            pageSize: query.pageSize,
            keyword: query.keyword || '',
            idThucDon: query.idThucDon
        };
        return this.http.get<IBaseResponseWithData<IMonByThucDonPagingResponse>>(`${this.api}/mon-by-thuc-don`, {params});
    }
    getById(id: number){
        return this.http.get<IBaseResponseWithData<IGetMenuById>>(`${this.api}/${id}`);
    }
    getMonVaoMenuById(id: number) {
        return this.http.get<IBaseResponseWithData<IGetByIdMonVaoMenu>>(`${this.api}/mon/${id}`);
    }
}