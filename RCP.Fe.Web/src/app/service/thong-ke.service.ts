import { IFindPagingThongKeKho } from "@/models/kho/thong-ke.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThongKeKhoService{
    api = '/api/app/thong-ke-kho';
    http = inject(HttpClient);

    findPaging(query: IFindPagingThongKeKho){
        let params = new HttpParams()
            .set('pageNumber', query.pageNumber.toString())
            .set('pageSize', query.pageSize.toString());

        if (query.keyword) {
            params = params.set('keyword', query.keyword);
        }

        if (query.idCinema !== undefined && query.idCinema !== null) {
            params = params.set('idCinema', query.idCinema.toString());
        }

        if (query.idKho !== undefined && query.idKho !== null) {
            params = params.set('idKho', query.idKho.toString());
        }

        if (query.idMatHang !== undefined && query.idMatHang !== null) {
            params = params.set('idMatHang', query.idMatHang.toString());
        }

        if (query.ngayNhap) {
            params = params.set('ngayNhap', query.ngayNhap);
        }

        return this.http.get<IBaseResponseWithData<any>>(`${this.api}`, { params });
    }
}