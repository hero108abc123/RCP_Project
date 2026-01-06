import { IGetDropDownTheLoai, IFindPagingPhim, ICreatePhim, IUpdatePhim, IGetDropDownPhim } from "@/models/movie/movie.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PhimService{
    api = '/api/app/phim';
    http = inject(HttpClient);

    getDropDown(){
        return this.http.get<IBaseResponseWithData<IGetDropDownPhim[]>>(`${this.api}/dropdown`);
    }

    getTheLoai(){
        return this.http.get<IBaseResponseWithData<IGetDropDownTheLoai[]>>(`${this.api}/the-loai/dropdown`);
    }
    
    findPaging(query: IFindPagingPhim){
        let params = new HttpParams()
            .set('pageNumber', query.pageNumber.toString())
            .set('pageSize', query.pageSize.toString());

        if (query.keyword) {
            params = params.set('keyword', query.keyword);
        }

        if (query.idTheLoai && query.idTheLoai.length > 0) {
            query.idTheLoai.forEach(id => {
                params = params.append('idTheLoai', id.toString());
            });
        }

        if (query.dangChieu !== undefined && query.dangChieu !== null) {
            params = params.set('dangChieu', query.dangChieu.toString());
        }

        if (query.ngonNgu) {
            params = params.set('ngonNgu', query.ngonNgu);
        }

        if (query.phanLoaiDoTuoi && query.phanLoaiDoTuoi.length > 0) {
            query.phanLoaiDoTuoi.forEach(item => {
                params = params.append('phanLoaiDoTuoi', item);
            });
        }

        if (query.daoDien) {
            params = params.set('daoDien', query.daoDien);
        }

        if (query.dienVien) {
            params = params.set('dienVien', query.dienVien);
        }

        if (query.tuNgay) {
            params = params.set('tuNgay', query.tuNgay);
        }

        if (query.denNgay) {
            params = params.set('denNgay', query.denNgay);
        }

        return this.http.get<IBaseResponseWithData<any>>(`${this.api}`, { params });
    }
    
    create (body:ICreatePhim){
        return this.http.post<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    update (body:IUpdatePhim){
        return this.http.put<IBaseResponseWithData<any>> (`${this.api}`, body);
    }
    delete (id:number){
        return this.http.delete<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
    getById(id:number){
        return this.http.get<IBaseResponseWithData<any>> (`${this.api}/${id}`);
    }
}