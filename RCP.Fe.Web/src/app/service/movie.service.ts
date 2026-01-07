import { IGetDropDownTheLoai, IFindPagingPhim, ICreatePhim, IUpdatePhim, IGetDropDownPhim } from "@/models/movie/movie.models";
import { IBaseResponseWithData } from "@/shared/models/request-paging.base.models";
import { HttpClient, HttpParams } from "@angular/common/http";

import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PhimService {
    api = '/api/app/phim';
    http = inject(HttpClient);

    getDropDown() {
        return this.http.get<IBaseResponseWithData<IGetDropDownPhim[]>>(`${this.api}/dropdown`);
    }

    getTheLoai() {
        return this.http.get<IBaseResponseWithData<IGetDropDownTheLoai[]>>(`${this.api}/the-loai/dropdown`);
    }
    
    findPaging(query: IFindPagingPhim) {
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
    
    // ✅ SỬA CREATE - DÙNG FORMDATA
    create(body: ICreatePhim) {
        const formData = new FormData();
        
        // Thêm các field text
        if (body.tenPhim) formData.append('tenPhim', body.tenPhim);
        if (body.moTa) formData.append('moTa', body.moTa);
        if (body.daoDien) formData.append('daoDien', body.daoDien);
        if (body.dienVien) formData.append('dienVien', body.dienVien);
        if (body.trailerUrl) formData.append('trailerUrl', body.trailerUrl);
        if (body.thoiLuongPhut) formData.append('thoiLuongPhut', body.thoiLuongPhut.toString());
        if (body.ngayKhoiChieu) {
            const date = new Date(body.ngayKhoiChieu);
            formData.append('ngayKhoiChieu', date.toISOString());
        }
        if (body.ngonNgu) formData.append('ngonNgu', body.ngonNgu);
        if (body.phanLoaiDoTuoi) formData.append('phanLoaiDoTuoi', body.phanLoaiDoTuoi);
        
        // Thêm file ảnh
        if (body.anhBia instanceof File) {
            formData.append('anhBia', body.anhBia, body.anhBia.name);
        }
        
        // Thêm mảng theLoaiIds
        if (body.theLoaiIds && body.theLoaiIds.length > 0) {
            body.theLoaiIds.forEach(id => {
                formData.append('theLoaiIds', id.toString());
            });
        }
        
        return this.http.post<IBaseResponseWithData<any>>(`${this.api}`, formData);
    }
    
    // ✅ SỬA UPDATE - DÙNG FORMDATA
    update(body: IUpdatePhim) {
        const formData = new FormData();
        
        // ID bắt buộc
        formData.append('id', body.id.toString());
        
        // Thêm các field text
        if (body.tenPhim) formData.append('tenPhim', body.tenPhim);
        if (body.moTa) formData.append('moTa', body.moTa);
        if (body.daoDien) formData.append('daoDien', body.daoDien);
        if (body.dienVien) formData.append('dienVien', body.dienVien);
        if (body.trailerUrl) formData.append('trailerUrl', body.trailerUrl);
        if (body.thoiLuongPhut) formData.append('thoiLuongPhut', body.thoiLuongPhut.toString());
        if (body.ngayKhoiChieu) {
            const date = new Date(body.ngayKhoiChieu);
            formData.append('ngayKhoiChieu', date.toISOString());
        }
        if (body.ngonNgu) formData.append('ngonNgu', body.ngonNgu);
        if (body.phanLoaiDoTuoi) formData.append('phanLoaiDoTuoi', body.phanLoaiDoTuoi);
        
        // Thêm file ảnh (nếu có file mới)
        if (body.anhBia instanceof File) {
            formData.append('anhBia', body.anhBia, body.anhBia.name);
        }
        
        // Thêm mảng theLoaiIds
        if (body.theLoaiIds && body.theLoaiIds.length > 0) {
            body.theLoaiIds.forEach(id => {
                formData.append('theLoaiIds', id.toString());
            });
        }
        
        return this.http.put<IBaseResponseWithData<any>>(`${this.api}`, formData);
    }
    
    delete(id: number) {
        return this.http.delete<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }
    
    getById(id: number) {
        return this.http.get<IBaseResponseWithData<any>>(`${this.api}/${id}`);
    }
}